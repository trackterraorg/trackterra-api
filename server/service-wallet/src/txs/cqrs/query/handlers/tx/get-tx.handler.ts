import { Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { TxRepository } from '@trackterra/repository';
import { utils } from '@juicycleff/repo-orm';
import { RpcException } from '@nestjs/microservices';
import { ReadTxResponse, Tx } from '@trackterra/proto-schema/wallet';
import { GetTxQuery } from '../../impl';

@QueryHandler(GetTxQuery)
export class GetTxHandler implements IQueryHandler<GetTxQuery> {
  logger = new Logger(this.constructor.name);
  txRepository: TxRepository;

  async execute(query: GetTxQuery): Promise<ReadTxResponse> {
    this.logger = new Logger(this.constructor.name);
    this.logger.log(`Async ${query.constructor.name}...`);
    const { input, txRepository } = query;
    this.txRepository = txRepository;

    if (!input.filter) {
      throw new RpcException('Missing space where input');
    }

    try {
      const where = JSON.parse(input.filter);
      const filter = utils.gqlMongoParser(where);
      const tx = await this.txRepository.findOne({ ...filter });

      return {
        tx: tx as unknown as Tx,
      };
    } catch (e) {
      this.logger.error(e);
      throw new RpcException(e);
    }
  }
}
