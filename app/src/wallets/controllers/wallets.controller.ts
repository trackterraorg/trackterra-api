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
import moment = require('moment');
import {
  BaseApiResponse,
  SwaggerBaseApiResponse,
} from '@trackterra/repository/dtos/response/base-api-response.dto';
import { ParseWalletResponseDto } from '@trackterra/app/parser/controllers/dto/parse-wallet.dto';
import {
  ReadWalletDetailResponseDto,
  ReadWalletResponseDto,
} from './dto/wallet.dto';

@Controller('/api/v1/wallets')
@ApiTags('Wallet')
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}

  @Put('/parse/:address')
  @ApiOperation({
    summary: 'Parse wallet address',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse(ParseWalletResponseDto),
  })
  async parseWallet(
    @Param('address') address: string,
  ): Promise<BaseApiResponse<ParseWalletResponseDto>> {
    const result = await this.walletsService.parseWallet({
      address,
    });
    return {
      data: result,
      meta: {},
    };
  }

  @Get('/:address')
  @ApiOperation({
    summary: 'Read wallet information',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse(ReadWalletResponseDto),
  })
  async readWallet(
    @Param('address') address: string,
  ): Promise<BaseApiResponse<ReadWalletResponseDto>> {
    const result = await this.walletsService.readWallet({
      address,
    });
    return {
      data: result,
      meta: {},
    };
  }

  @Get('/detail/:address')
  @ApiOperation({
    summary:
      'Read wallet detail information including top operations and active contracts',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse(ReadWalletDetailResponseDto),
  })
  async readWalletDetail(
    @Param('address') address: string,
  ): Promise<BaseApiResponse<ReadWalletDetailResponseDto>> {
    const result = await this.walletsService.readWalletDetail({
      address,
    });
    return {
      data: result,
      meta: {},
    };
  }
}
