import {
  Res,
  Controller,
  Get,
  Param,
  Put,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { WalletsService } from '../wallets.service';
import { join } from 'path';
import * as fs from 'fs';
import * as _ from 'lodash';
import { walletsDir } from '@trackterra/common';
import moment = require('moment');
import { DownloadCsvRequestDto, FindTxsRequestDto } from './dto/tx-input';
import { FindTxsResponse } from '../wallet.types';
import {
  BaseApiResponse,
  SwaggerBaseApiResponse,
} from '@trackterra/repository/dtos/response/base-api-response.dto';
import { FindTxsResponseDto } from './dto/tx.dto';

@Controller('/api/v1/txs')
@ApiTags('Transactions')
export class TxsController {
  constructor(private readonly walletsService: WalletsService) {}

  @Get('/:address')
  @ApiOperation({
    summary: 'List of transactions for wallet',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse(FindTxsRequestDto),
  })
  async listTxs(
    @Param('chain') chain: string,
    @Param('address') address: string,
    @Query() args: FindTxsRequestDto,
  ): Promise<BaseApiResponse<FindTxsResponseDto>> {
    const result = await this.walletsService.getTxs(chain, address, args);

    return {
      data: {
        ...result,
      },
      meta: {
        totalCount: result?.totalCount,
      },
    };
  }

  @Get('/csv/:address/:filename')
  async csv(@Res() res, @Query() { address, filename }: DownloadCsvRequestDto) {
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
