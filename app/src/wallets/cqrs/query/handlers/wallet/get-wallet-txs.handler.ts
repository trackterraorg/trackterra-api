import { Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { utils } from '@juicycleff/repo-orm';
import { Order, TxRepository, WalletRepository } from '@trackterra/repository';
import { GetWalletTxsQuery } from '../../impl';
import { RpcException } from '@nestjs/microservices';
import {
  FindTxsResponse,
  Tx,
  TxExtra,
  TxNode,
} from '@trackterra/proto-schema/wallet';
import _ = require('lodash');
import { AccAddress } from '@terra-money/terra.js';
import {
  cleanEmptyProperties,
  fShortenHash,
  walletsDir,
} from '@trackterra/common';
import { join } from 'path';
import * as fs from 'fs';
import { v1 as uuid } from 'uuid';
import { createObjectCsvWriter } from 'csv-writer';
import { ICsvHeaderCell } from '@trackterra/tax-apps/interfaces/csv-header-cell.interface';
import { TaxappSelector } from '@trackterra/tax-apps/apps';

@QueryHandler(GetWalletTxsQuery)
export class GetWalletTxsHandler implements IQueryHandler<GetWalletTxsQuery> {
  logger = new Logger(this.constructor.name);
  txRepository: TxRepository;

  constructor(private readonly walletRepository: WalletRepository) {}

  async execute(query: GetWalletTxsQuery): Promise<FindTxsResponse> {
    this.logger = new Logger(this.constructor.name);
    this.logger.log(`Async ${query.constructor.name}...`);
    const { input } = query;

    const { address, order, orderBy } = input;

    if (_.isEmpty(address)) {
      throw new RpcException('Wallet address required!');
    }

    if (!AccAddress.validate(address)) {
      throw new RpcException('Please enter a valid address');
    }

    const walletParsed = await this.walletRepository.exist({
      address,
    });

    if (!walletParsed) {
      throw new RpcException(
        'Wallet has not been parsed. Please parse it first!',
      );
    }

    let conditions = {
      walletAddress: address,
      protocol: {
        $ne: 'Unparsed',
      },
    };

    try {
      if (input.filter) {
        const where = JSON.parse(input.filter);

        const filter = utils.gqlMongoParser(where);
        conditions = { ...conditions, ...filter };
      }

      const sort = {};
      const sortDir =
        Order[(['asc', 'desc'].includes(order) ? order : 'desc').toUpperCase()];
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

      const mappedBasedOnApp = objTaxapp.processTxs(txs);

      if (input.csv) {
        const csvFileName = await this.createCsvFile(
          address,
          mappedBasedOnApp,
          objTaxapp.csvCells(),
        );

        return {
          txs: null,
          totalCount: null,
          csvFileName,
        };
      }

      const mappedTxs = mappedBasedOnApp.map((tx) =>
        this.txEntityToView(Tx.fromJSON(tx)),
      );

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

  private async createCsvFile(
    address: string,
    txs: any[],
    header: ICsvHeaderCell[],
  ) {
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

  txEntityToView(tx: Tx): TxNode {
    const extras: TxExtra = {
      sTxHash: fShortenHash(tx.txhash),
      rTimestamp: tx.timestamp,
      sWalletAddress: fShortenHash(tx.walletAddress),
      sContract: fShortenHash(tx.contract),
      sSender: fShortenHash(tx.sender),
      sRecipient: fShortenHash(tx.recipient),
    };

    return { tx, extras };
  }
}
