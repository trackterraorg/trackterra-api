import { InternalServerErrorException, Logger } from '@nestjs/common';
import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  TxRepository,
  WalletEntity,
  WalletRepository,
} from '@trackterra/repository';
import { ParseWalletCommand, ReparseWalletCommand } from '../../impl';
import { AccAddress } from '@terra-money/terra.js';
import * as _ from 'lodash';
import moment = require('moment');
import { ParsingStatus } from '@trackterra/repository/enums/parsing-status.enum';
import { BadRequestError } from '@trackterra/common';
import { ParseWalletResponse } from '@trackterra/app/parser/parser.types';
import { ValidatorService } from '@trackterra/core';

/**
 * @class
 * @implements {ICommandHandler<ReparseWalletCommand>}
 */
@CommandHandler(ReparseWalletCommand)
export class ReparseWalletHandler
  implements ICommandHandler<ReparseWalletCommand>
{
  logger = new Logger(this.constructor.name);
  /**
   * @constructor
   * @param walletRepository {WalletRepository}
   */
  public constructor(
    private readonly walletRepository: WalletRepository,
    private readonly txRepository: TxRepository,
    private readonly validatorService: ValidatorService,
    private readonly commandBus: CommandBus,
  ) {}
  /**
   * @param command {ReparseWalletCommand}
   */
  async execute(command: ReparseWalletCommand): Promise<ParseWalletResponse> {
    this.logger.log(`Async ${command.constructor.name}...`);

    const { chain, address } = command.input;

    try {
      if (!this.validatorService.isValidChain(chain)) {
        throw new BadRequestError('Please select a valid chain');
      }

      if (!AccAddress.validate(address)) {
        throw new BadRequestError('Invalid terra account address');
      }

      let wallet: WalletEntity = await this.walletRepository.findOne(
        {
          chain,
          address,
        },
        true,
      );

      if (!wallet) {
        const msg = `Account ${chain}-${address} has not been parsed before!`;
        this.logger.log(msg);
        return {
          numberOfNewParsedTxs: 0,
          status: ParsingStatus.FAILED,
          msg,
        };
      }

      if (moment(moment()).diff(wallet.updatedAt) < 60000 * 60) {
        const tryAgain = 59 - moment().diff(wallet.updatedAt, 'minutes');
        const msg = `Wallet is recently parsed. Please try again in ${tryAgain} minutes!`;
        this.logger.log(msg);
        return {
          numberOfNewParsedTxs: 0,
          status: ParsingStatus.FAILED,
          msg,
        };
      }

      await this.walletRepository.deleteMany({
        chain: wallet.chain,
        address: wallet.address,
      });

      await this.txRepository.deleteMany({
        chain: wallet.chain,
        address: wallet.address,
      });

      return await this.commandBus.execute(
        new ParseWalletCommand({
          chain,
          address,
        }),
      );
    } catch (error) {
      this.logger.log(error);
      throw new InternalServerErrorException(error);
    }
  }
}
