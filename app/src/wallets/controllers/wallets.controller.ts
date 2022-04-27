import { Res, Controller, Get, Param, Put } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  ReadWalletDetailResponse,
  ReadWalletResponse,
} from '@trackterra/proto-schema/wallet';
import { WalletsService } from '../wallets.service';
import { join } from 'path';
import * as fs from 'fs';
import * as _ from 'lodash';
import { walletsDir } from '@trackterra/common';
import moment = require('moment');
import { ParseWalletResponse } from '@trackterra/app/parser/parser.types';

@Controller('/api/v1/wallets')
@ApiTags('Wallet')
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}

  @Put('/parse/:address')
  @ApiOkResponse({ description: 'Done parsing wallet' })
  async parseWallet(
    @Param('address') address: string,
  ): Promise<ParseWalletResponse> {
    const result = await this.walletsService.parseWallet({
      address,
    });
    return result;
  }

  @Get('/:address')
  @ApiOkResponse({ description: 'Done checking wallet' })
  async readWallet(
    @Param('address') address: string,
  ): Promise<ReadWalletResponse> {
    const result = await this.walletsService.readWallet({
      address,
    });
    return result;
  }

  @Get('/detail/:address')
  @ApiOkResponse({ description: 'Wallet detail info retrieved successfully' })
  async readWalletDetail(
    @Param('address') address: string,
  ): Promise<ReadWalletDetailResponse> {
    const result = await this.walletsService.readWalletDetail({
      address,
    });
    return result;
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
