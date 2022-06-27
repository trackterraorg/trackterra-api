import {
  BadRequestException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { utils } from '@juicycleff/repo-orm';
import { Order, TxRepository, WalletRepository } from '@trackterra/repository';
import { GetWalletTxsQuery } from '../../impl';
import _ = require('lodash');
import { AccAddress } from '@terra-money/terra.js';
import {
  cleanEmptyProperties,
  fShortenHash,
  queryMapper,
  walletsDir,
} from '@trackterra/common';
import { join } from 'path';
import * as fs from 'fs';
import { v1 as uuid } from 'uuid';
import { createObjectCsvWriter } from 'csv-writer';
import { TaxappSelector } from '@trackterra/tax-apps/apps';
import { ICsvHeaderCell } from '@trackterra/tax-apps/interfaces';
import { limitRecord, skipRecord } from '@trackterra/repository/dtos/utils';
import { toLower, toNumber } from 'lodash';
import {
  FindTxsResponse,
  Tx,
  TxExtra,
  TxNode,
} from '@trackterra/app/wallets/wallet.types';

@QueryHandler(GetWalletTxsQuery)
export class GetWalletTxsHandler implements IQueryHandler<GetWalletTxsQuery> {
  logger = new Logger(this.constructor.name);

  constructor(
    private readonly walletRepository: WalletRepository,
    private readonly txRepository: TxRepository,
  ) {}

  async execute(query: GetWalletTxsQuery): Promise<FindTxsResponse> {
    this.logger = new Logger(this.constructor.name);
    this.logger.log(`Async ${query.constructor.name}...`);
    const { address, input } = query;

    const { chain, order, orderBy, limit, page, q } = input;

    if (_.isEmpty(chain)) {
      throw new BadRequestException('Please provide valid chain!');
    }

    if (_.isEmpty(address)) {
      throw new BadRequestException('Wallet address required!');
    }

    if (!AccAddress.validate(address)) {
      throw new BadRequestException('Please enter a valid address');
    }

    const walletParsed = await this.walletRepository.exist({
      chain,
      address,
    });

    if (!walletParsed) {
      throw new BadRequestException(
        'Wallet has not been parsed. Please parse it first!',
      );
    }

    let conditions = {
      walletAddress: address,
      chain,
      protocol: {
        $ne: 'Unparsed',
      },
    };

    try {
      if (q) {
        const qWhere = q ? JSON.stringify(queryMapper(q)) : q;
        const where = JSON.parse(qWhere);

        const filter = utils.gqlMongoParser(where);
        conditions = { ...conditions, ...filter };
      }

      const sort = {};
      const sortDir =
        Order[
          (['asc', 'desc'].includes(toLower(order))
            ? order
            : 'desc'
          ).toUpperCase()
        ];
      const sortAttr = orderBy ?? 'blockHeight';
      sort[sortAttr] = sortDir;

      let queryParams = {
        conditions,
        sort,
      };

      let totalCount = 0;
      if (!input.csv) {
        const collection = await this.txRepository.collection;
        const cleanConditions = cleanEmptyProperties(conditions);

        totalCount = await collection.find(cleanConditions).count();

        let limitRecords = limitRecord(limit);
        const paginationParams = {
          limit: limitRecords,
          skip: skipRecord(page, limitRecords),
        };

        queryParams = { ...queryParams, ...paginationParams };
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

      const mappedTxs = mappedBasedOnApp.map((tx) => this.txEntityToView(tx));

      return {
        txs: mappedTxs,
        totalCount,
        csvFileName: null,
      };
    } catch (e) {
      this.logger.error(e);
      throw new InternalServerErrorException(e);
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
