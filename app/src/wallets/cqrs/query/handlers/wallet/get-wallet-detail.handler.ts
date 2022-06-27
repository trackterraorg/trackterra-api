import {
  BadRequestException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { TxRepository, WalletRepository } from '@trackterra/repository';
import { GetWalletDetailQuery } from '../../impl';
import _ = require('lodash');
import { AccAddress } from '@terra-money/terra.js';
import { timeToCalendarFormat } from '@trackterra/common';
import { ReadWalletDetailResponse } from '@trackterra/app/wallets/wallet.types';

@QueryHandler(GetWalletDetailQuery)
export class GetWalletDetailHandler
  implements IQueryHandler<GetWalletDetailQuery>
{
  logger = new Logger(this.constructor.name);
  constructor(
    private readonly walletRepository: WalletRepository,
    private readonly txRepository: TxRepository,
  ) {}

  async execute(
    query: GetWalletDetailQuery,
  ): Promise<ReadWalletDetailResponse> {
    const { chain, address } = query?.input;

    if (_.isEmpty(chain)) {
      throw new BadRequestException('Chain is required!');
    }

    if (_.isEmpty(address)) {
      throw new BadRequestException('Wallet address required!');
    }

    if (!AccAddress.validate(address)) {
      throw new BadRequestException('Please enter a valid address');
    }

    try {
      const wallet = await this.walletRepository.findOne(
        { chain, address },
        true,
      );

      if (wallet) {
        const lastParsingTime = timeToCalendarFormat(wallet.updatedAt);
        const highestParsedBlock = wallet.highestParsedBlock;

        const txCount = await this.txRepository.countWalletTxs(chain, address);

        const unclassifiedTxCount = await this.txRepository.countUnclassified(
          chain,
          address,
        );

        const topActiveContracts = await this.txRepository.topActiveContracts(
          chain,
          address,
        );

        const topOperations = await this.txRepository.topOperations(
          chain,
          address,
        );

        return {
          address,
          txCount,
          unclassifiedTxCount,
          lastParsingTime,
          highestParsedBlock,
          topActiveContracts,
          topOperations,
        };
      }

      throw new BadRequestException('Could not locate wallet!');
    } catch (e) {
      this.logger.error(e);
      throw new InternalServerErrorException(e);
    }
  }
}
