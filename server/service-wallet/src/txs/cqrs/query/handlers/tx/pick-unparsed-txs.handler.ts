import { Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { TxRepository } from '@trackterra/repository';
import { RpcException } from '@nestjs/microservices';
import { PickUnparsedTxsResponse } from '@trackterra/proto-schema/wallet';
import { PickUnparsedTxsQuery } from '../../impl';

@QueryHandler(PickUnparsedTxsQuery)
export class PickUnparsedTxsHandler
  implements IQueryHandler<PickUnparsedTxsQuery>
{
  logger = new Logger(this.constructor.name);
  txRepository: TxRepository;

  async execute(query: PickUnparsedTxsQuery): Promise<PickUnparsedTxsResponse> {
    this.logger = new Logger(this.constructor.name);
    this.logger.log(`Async ${query.constructor.name}...`);
    const { input, txRepository } = query;
    this.txRepository = txRepository;

    if (!input.txhashes) {
      throw new RpcException('Missing tx hashes');
    }

    try {
      const conditions = {
        txhash: {
          $exists: true,
          $in: input.txhashes,
        },
      };

      const txs = await this.txRepository.find({ conditions });
      const parsedTxhashes = txs.map((tx) => tx.txhash);

      const txhashes = input.txhashes.filter(
        (txhash) => !parsedTxhashes.includes(txhash),
      );

      return {
        txhashes,
      };
    } catch (e) {
      this.logger.error(e);
      throw new RpcException(e);
    }
  }
}
