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
import { join } from 'path';
import * as fs from 'fs';
import * as _ from 'lodash';
import { queryMapper, walletsDir } from '@trackterra/common';
import moment = require('moment');
import { RpcException } from '@nestjs/microservices';
import { FindTxsResponse } from '@trackterra/proto-schema/wallet';
import { WalletTxsService } from './wallet-txs.service';
@Controller('/api/v1')
@ApiTags('Txs')
export class WalletTxsController {
  constructor(private readonly txsService: WalletTxsService) {}

  @Get('/txs/:address')
  async getTxs(
    @Param('address') address: string,
    @Query() args: FindTxsDto,
  ): Promise<FindTxsResponse> {
    try {
      return await this.txsService.getTxs(address, args);
    } catch (e) {
      throw new RpcException('Could not fetch txs!');
    }
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
}
