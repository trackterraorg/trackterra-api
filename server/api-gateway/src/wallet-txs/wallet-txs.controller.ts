import {
  Controller,
  Get,
  Header,
  Param,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { WalletsRpcClientService } from '@trackterra/core';
import { FindTxsDto } from '@trackterra/repository/dtos/request/find-txs.dto';
import { mapTxToTaxApp } from 'server/service-wallet/src/common';
import { mkdirSync } from 'fs';
import { join } from 'path';
import { v1 as uuid } from 'uuid';
import * as fs from 'fs';
import { createObjectCsvWriter } from 'csv-writer';
import * as _ from 'lodash';
import { queryMapper, walletsDir } from '@trackterra/common';
import moment = require('moment');
import { RpcException } from '@nestjs/microservices';
import { TaxappSelector } from '@trackterra/tax-apps/apps';
import { ICsvHeaderCell } from '@trackterra/tax-apps/interfaces/base.taxapp';
import { FindTaxAppTxsResponse } from 'server/service-wallet/src/common/taxapp.types';
@Controller('/api/v1')
@ApiTags('Txs')
export class WalletTxsController {
  constructor(private readonly wallet: WalletsRpcClientService) {}

  @Get('/txs/:address')
  async getTxs(
    @Param('address') address: string,
    @Query() { taxapp, q, skip, take, order, orderBy, csv }: FindTxsDto,
  ): Promise<FindTaxAppTxsResponse> {
    const filter = q ? JSON.stringify(queryMapper(q)) : q;
    const result = await this.wallet.svc
      .findTxs({
        address,
        filter,
        paginate: {
          skip,
          limit: take,
        },
        orderBy,
        order,
        csv,
      })
      .toPromise();

    if (!result) {
      throw new RpcException('Could not fetch txs!');
    }

    const objTaxapp = TaxappSelector.select(taxapp);

    const txs = await mapTxToTaxApp(result.txs, objTaxapp);

    if (csv) {
      const csvFileName = await this.createCsvFile(address, txs, objTaxapp.csvCells());
      return { csvFileName };
    }

    return {
      txs,
      totalCount: result.totalCount,
    };
  }

  @Get('/csv/txs/:address/:filename')
  async csv(
    @Res() res,
    @Param('address') address: string,
    @Param('filename') filename: string,
  ) {
    try {
      const p = join(walletsDir(), address, filename);

      if (fs.existsSync(p)) {
        res.set({
          'Content-Disposition': `attachment; filename=export-${moment().valueOf()}.csv`,
        });
        const st = fs.createReadStream(p);
        st.pipe(res);
      }
    } catch (err) {
      console.error(err);
    }
  }

  private async createCsvFile(address: string, txNodes: any[], header: ICsvHeaderCell[]) {
    const dir = join(walletsDir(), address);

    if (!fs.existsSync(dir)) {
      mkdirSync(dir);
    }
    const fileName = _.replace(`${uuid()}.csv`, /-/g, '');
    const filePath = join(dir, fileName);

    const txs = txNodes
      .map((txNode) => txNode.tx)
      .map((tx) => {
        delete tx.id;
        return tx;
      });

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
