import {
  BadRequestException,
  CACHE_MANAGER,
  Inject,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { WalletRepository } from '@trackterra/repository';
import { UpdateWalletCommand } from '../../impl';
import { AccAddress } from '@terra-money/terra.js';
import * as _ from 'lodash';
import moment = require('moment');
import {
  UpdateWalletResponse,
  Wallet,
} from '@trackterra/app/wallets/wallet.types';

/**
 * @class
 * @implements {ICommandHandler<UpdateWalletCommand>}
 */
@CommandHandler(UpdateWalletCommand)
export class UpdateWalletHandler
  implements ICommandHandler<UpdateWalletCommand>
{
  logger = new Logger(this.constructor.name);
  /**
   * @constructor
   * @param walletRepository {WalletRepository}
   */
  public constructor(
    private readonly walletRepository: WalletRepository,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  /**
   * @param command {UpdateWalletCommand}
   */
  async execute(command: UpdateWalletCommand): Promise<UpdateWalletResponse> {
    this.logger.log(`Async ${command.constructor.name}...`);
    const { address, highestParsedBlock, status } = command.input;

    try {
      if (!AccAddress.validate(address)) {
        throw new BadRequestException('Invalid terra account address');
      }

      const wallet = await this.walletRepository.findOneAndUpdate({
        conditions: {
          address,
        },
        updates: {
          $set: {
            highestParsedBlock,
            status,
          },
        },
      });

      this.cacheManager.reset();

      return {
        wallet: wallet as unknown as Wallet,
      };
    } catch (error) {
      this.logger.log(error);
      throw new InternalServerErrorException(error);
    }
  }
}
