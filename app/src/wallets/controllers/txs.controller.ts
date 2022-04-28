import {
  Res,
  Controller,
  Get,
  Param,
  Put,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { WalletsService } from '../wallets.service';
import { join } from 'path';
import * as fs from 'fs';
import * as _ from 'lodash';
import { walletsDir } from '@trackterra/common';
import moment = require('moment');
import { FindTxsResponse } from '@trackterra/proto-schema/wallet';
import { FindTxsRequestDto } from './dto/tx-input';

@Controller('/api/v1/txs')
@ApiTags('Transactions')
export class TxsController {
  constructor(private readonly walletsService: WalletsService) {}

  @Get('/:address')
  async getTxs(
    @Param('address') address: string,
    @Query() args: FindTxsRequestDto,
  ): Promise<FindTxsResponse> {
    return await this.walletsService.getTxs(address, args);
  }

  @Get('/csv/:address/:filename')
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
