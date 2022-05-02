import {
  CACHE_MANAGER,
  Inject,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { WalletEntity, WalletRepository } from '@trackterra/repository';
import { ParseWalletCommand, UpdateWalletCommand } from '../../impl';
import { AccAddress } from '@terra-money/terra.js';
import * as _ from 'lodash';
import moment = require('moment');
import { ParsingStatus } from '@trackterra/repository/enums/parsing-status.enum';
import { BlacklistLoader } from '@trackterra/parser/blacklist';
import { ParserService } from '@trackterra/app/parser/parser.service';
import { BadRequestError } from '@trackterra/common';
import { ParseWalletResponse } from '@trackterra/app/parser/parser.types';

/**
 * @class
 * @implements {ICommandHandler<ParseWalletCommand>}
 */
@CommandHandler(ParseWalletCommand)
export class ParseWalletHandler implements ICommandHandler<ParseWalletCommand> {
  logger = new Logger(this.constructor.name);
  /**
   * @constructor
   * @param walletRepository {WalletRepository}
   */
  public constructor(
    private readonly walletRepository: WalletRepository,
    private readonly parserService: ParserService,
    private readonly commandBus: CommandBus,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}
  /**
   * @param command {ParseWalletCommand}
   */
  async execute(command: ParseWalletCommand): Promise<ParseWalletResponse> {
    this.logger.log(`Async ${command.constructor.name}...`);

    const { address } = command.input;

    try {
      if (!AccAddress.validate(address)) {
        throw new BadRequestError('Invalid terra account address');
      }

      const blacklistLoader: BlacklistLoader =
        await BlacklistLoader.getInstance();

      if (blacklistLoader.isInBlackList(address)) {
        return {
          numberOfNewParsedTxs: 0,
          status: ParsingStatus.FAILED,
          msg: blacklistLoader.addressBlockMessage(address),
        };
      }

      let wallet: WalletEntity = await this.walletRepository.findOne(
        {
          address,
        },
        true,
      );

      if (!wallet) {
        wallet = await this.walletRepository.create({
          address,
          status: ParsingStatus.PARSING,
        });
        this.logger.log('Create new wallet address');
      } else if (wallet.status === ParsingStatus.PARSING) {
        const msg = 'Wallet is already parsing!';
        this.logger.log(msg);
        return {
          numberOfNewParsedTxs: 0,
          status: ParsingStatus.PARSING,
          msg,
        };
      } else if (moment(moment()).diff(wallet.updatedAt) < 60000) {
        const tryAgain = 59 - moment().diff(wallet.updatedAt, 'seconds');
        const msg = `Wallet already parsed. Please try again in ${tryAgain} seconds!`;
        this.logger.log(msg);
        return {
          numberOfNewParsedTxs: 0,
          status: ParsingStatus.DONE,
          msg,
        };
      }

      await this.commandBus.execute(
        new UpdateWalletCommand({
          highestParsedBlock: wallet.highestParsedBlock,
          status: ParsingStatus.PARSING,
          address: wallet.address,
        }),
      );

      const highestParsedBlockHeight = wallet.highestParsedBlock ?? 0;

      let parsingResult: any;
      try {
        parsingResult = await this.parserService.doParse({
          address: wallet.address,
          highestParsedBlockHeight,
        });
      } catch (e) {
        await this.walletRepository.findOneByIdAndUpdate(wallet.id, {
          updates: {
            $set: {
              status: ParsingStatus.FAILED,
            },
          },
        });
      }

      this.cacheManager.reset();

      return {
        ...parsingResult,
        status: parsingResult.status as unknown as ParsingStatus,
      };
    } catch (error) {
      this.logger.log(error);
      throw new InternalServerErrorException(error);
    }
  }
}
