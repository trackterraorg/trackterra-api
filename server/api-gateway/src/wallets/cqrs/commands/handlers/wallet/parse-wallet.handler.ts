import { CACHE_MANAGER, Inject, Logger } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { WalletEntity, WalletRepository } from '@trackterra/repository';
import { ParseWalletCommand, UpdateWalletCommand } from '../../impl';
import { RpcException } from '@nestjs/microservices';
import { AccAddress } from '@terra-money/terra.js';
import * as _ from 'lodash';
import moment = require('moment');
import {
  ParseWalletResponse,
  ParsingStatus,
} from '@trackterra/proto-schema/wallet';
import { BlacklistLoader } from '@trackterra/parser/blacklist';
import { ParserService } from 'server/api-gateway/src/parser/parser.service';

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
        throw new RpcException('Invalid terra account address');
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
          status: ParsingStatus.DONE,
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

      // fire parsing event here

      
      // try {
      //   parsingResult = await this.parserService.doParse({
      //     address: wallet.address,
      //     highestParsedBlockHeight,
      //   });
      // } catch (e) {
      //   await this.walletRepository.findOneByIdAndUpdate(wallet.id, {
      //     updates: {
      //       $set: {
      //         status: ParsingStatus.FAILED,
      //       },
      //     },
      //   });
      // }

      this.cacheManager.reset();

      return {
        ...parsingResult,
        status: parsingResult.status as unknown as ParsingStatus,
      };
    } catch (error) {
      this.logger.log(error);
      throw new RpcException(error);
    }
  }
}
