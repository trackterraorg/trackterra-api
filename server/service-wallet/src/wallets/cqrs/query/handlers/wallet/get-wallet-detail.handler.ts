import { Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { utils } from '@juicycleff/repo-orm';
import { TxRepository, WalletRepository } from '@trackterra/repository';
import { GetWalletDetailQuery } from '../../impl';
import { RpcException } from '@nestjs/microservices';
import {
  ReadWalletDetailResponse,
  ReadWalletResponse,
  Wallet,
} from '@trackterra/proto-schema/wallet';
import _ = require('lodash');
import { AccAddress } from '@terra-money/terra.js';
import { timeToCalendarFormat } from '@trackterra/common';

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
    this.logger.log(query);
    const { address } = query?.input;

    if (_.isEmpty(address)) {
      throw new RpcException('Wallet address required!');
    }

    if (!AccAddress.validate(address)) {
      throw new RpcException('Please enter a valid address');
    }

    try {
      const wallet = await this.walletRepository.findOne({ address }, true);

      if (wallet) {
        const lastParsingTime = timeToCalendarFormat(wallet.updatedAt);
        const highestParsedBlock = wallet.highestParsedBlock;

        const txCount = await this.txRepository.countWalletTxs(wallet.address);

        const unclassifiedTxCount = await this.txRepository.countUnclassified(
          wallet.address,
        );

        const topActiveContracts = await this.txRepository.topActiveContracts(
          wallet.address,
        );

        const topOperations = await this.txRepository.topOperations(
          wallet.address,
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

      throw new RpcException('Could not locate wallet!');
    } catch (e) {
      this.logger.error(e);
      throw new RpcException(e);
    }
  }
}
