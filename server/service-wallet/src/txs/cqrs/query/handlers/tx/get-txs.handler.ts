import { Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { utils } from '@juicycleff/repo-orm';
import {
  Order,
  TxRepository,
  WalletRepository,
} from '@trackterra/repository';
import { GetTxsQuery } from '../../impl';
import { RpcException } from '@nestjs/microservices';
import {
  FindTxsResponse, Tx,
} from '@trackterra/proto-schema/wallet';
import _ = require('lodash');
import { AccAddress } from '@terra-money/terra.js';
import {
  mapTxToTaxApp,
  txEntityToView,
} from 'server/service-wallet/src/common';
import { cleanEmptyProperties, walletsDir } from '@trackterra/common';
import { join } from 'path';
import * as fs from 'fs';
import { v1 as uuid } from 'uuid';
import { createObjectCsvWriter } from 'csv-writer';
import { ICsvHeaderCell } from '@trackterra/tax-apps/interfaces/csv-header-cell.interface';
import { TaxappSelector } from '@trackterra/tax-apps/apps';
import { TaxAppTxType } from 'server/service-wallet/src/common/taxapp.types';

@QueryHandler(GetTxsQuery)
export class GetTxsHandler implements IQueryHandler<GetTxsQuery> {
  logger = new Logger(this.constructor.name);
  txRepository: TxRepository;

  constructor(private readonly walletRepository: WalletRepository) {}

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

    const walletParsed = await this.walletRepository.exist({
      address
    });
    
    if (! walletParsed) {
      throw new RpcException('Wallet has not been parsed. Please parse it first!');
    }

    let conditions = {
      walletAddress: address,
      protocol: {
        "$ne": "Unparsed"
      }
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

      const objTaxapp = TaxappSelector.select(input?.taxapp ?? 'regular');
      
      const mappedBasedOnApp = await mapTxToTaxApp(txs, objTaxapp);

      if ( input.csv ) {
        
        const csvFileName = await this.createCsvFile(address, mappedBasedOnApp, objTaxapp.csvCells());

        return {
          txs: null,
          totalCount: null,
          csvFileName,
        }
      }
      
      const mappedTxs = mappedBasedOnApp.map((tx) => txEntityToView(Tx.fromJSON(tx)));

      return {
        txs: mappedTxs,
        totalCount,
        csvFileName: null,
      };
    } catch (e) {
      this.logger.error(e);
      throw new RpcException(e);
    }
  }

  private async createCsvFile(address: string, txs: TaxAppTxType[], header: ICsvHeaderCell[]) {

    const dir = join(walletsDir(), address);

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    const fileName = _.replace(`${uuid()}.csv`, /-/g, '');
    const filePath = join(dir, fileName);

    const csvWriter = createObjectCsvWriter({
      path: filePath,
      header,
    });

    await csvWriter
      .writeRecords(txs) // returns a promise
      .then(() => {})
      .catch((e) => {
        console.log(e);
      });
    
    return fileName;
  }
}
