import {
  BadRequestException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { WalletEntity, WalletRepository } from '@trackterra/repository';
import { GetWalletQuery } from '../../impl';
import _ = require('lodash');
import { AccAddress } from '@terra-money/terra.js';
import { fShortenHash } from '@trackterra/common';
import {
  ReadWalletResponse,
  Wallet,
} from '@trackterra/app/wallets/wallet.types';
import { ParsingStatus } from '@trackterra/repository/enums/parsing-status.enum';

@QueryHandler(GetWalletQuery)
export class CheckWalletHandler implements IQueryHandler<GetWalletQuery> {
  logger = new Logger(this.constructor.name);
  constructor(private readonly walletRepository: WalletRepository) {}

  async execute(query: GetWalletQuery): Promise<ReadWalletResponse> {
    const { input } = query;
    const { chain, address } = input;

    if (_.isEmpty(address)) {
      throw new BadRequestException('Wallet address required!');
    }

    if (!AccAddress.validate(address)) {
      throw new BadRequestException('Please enter a valid address');
    }

    try {
      const walletEntity: WalletEntity = await this.walletRepository.findOne(
        { chain, address },
        true,
      );

      if (!walletEntity) {
        throw new BadRequestException(
          'Wallet not parsed. Please parse it first!',
        );
      }

      const wallet = walletEntity as unknown as Wallet;

      const sAddress = fShortenHash(wallet.address);

      return {
        wallet,
        extras: {
          sAddress,
          parsed: wallet.status === ParsingStatus.DONE,
        },
      };
    } catch (e) {
      this.logger.error(e);
      throw new InternalServerErrorException(e);
    }
  }
}
