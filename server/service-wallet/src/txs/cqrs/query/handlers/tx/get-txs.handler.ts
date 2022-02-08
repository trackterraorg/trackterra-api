import { Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { utils } from '@juicycleff/repo-orm';
import {
  Order,
  TxEntity,
  TxRepository,
  WalletRepository,
} from '@trackterra/repository';
import { GetTxsQuery } from '../../impl';
import { RpcException } from '@nestjs/microservices';
import {
  FindTxsResponse,
  FindTxsResponseCointracker,
  GQLPaginate,
  PageInfo,
  Paginate,
  RestPaginate,
  Tx,
  TxExtra,
  TxNode,
} from '@trackterra/proto-schema/wallet';
import _ = require('lodash');
import { AccAddress } from '@terra-money/terra.js';
import { filter, upperCase } from 'lodash';
import {
  txEntityToView,
  txViewToCointrackerTx,
} from 'server/service-wallet/src/common';
import { cleanEmptyProperties } from '@trackterra/common';

@QueryHandler(GetTxsQuery)
export class GetTxsHandler implements IQueryHandler<GetTxsQuery> {
  logger = new Logger(this.constructor.name);
  txRepository: TxRepository;

  async execute(query: GetTxsQuery): Promise<FindTxsResponse> {
    this.logger = new Logger(this.constructor.name);
    this.logger.log(`Async ${query.constructor.name}...`);
    const { input, txRepository } = query;
    this.txRepository = txRepository;

    const { address, order, orderBy } = input;

    if (_.isEmpty(address)) {
      throw new RpcException('Wallet address required!');
    }

    if (!AccAddress.validate(address)) {
      throw new RpcException('Please enter a valid address');
    }

    let conditions = {
      walletAddress: address,
    };

    try {
      if (input.filter) {
        const where = JSON.parse(input.filter);

        const filter = utils.gqlMongoParser(where);
        conditions = { ...conditions, ...filter };
      }

      const sort = {};
      const sortDir = Order[(['asc', 'desc'].includes(order) ? order : 'desc').toUpperCase()];
      const sortAttr = orderBy ?? 'blockHeight';
      sort[sortAttr] = sortDir;

      const queryParams = {
        conditions,
        sort,
      };

      let totalCount = 0;
      if (!input.csv) {
        queryParams['limit'] = input.paginate?.limit || 10;
        queryParams['skip'] = input.paginate?.skip || 0;

        const collection = await this.txRepository.collection;
        const cleanConditions = cleanEmptyProperties(conditions);

        totalCount = await collection.find(cleanConditions).count();
      }

      const txs = await this.txRepository.find(queryParams);

      const mappedTxs = txs.map((tx) => txEntityToView(tx));

      return {
        txs: mappedTxs,
        totalCount,
      };
    } catch (e) {
      this.logger.error(e);
      throw new RpcException(e);
    }
  }
}
