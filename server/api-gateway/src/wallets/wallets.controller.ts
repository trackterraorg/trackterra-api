import { Controller, Get, Param, Put } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { WalletsRpcClientService } from '@trackterra/core';
import {
  ParseWalletResponse,
  ReadWalletDetailResponse,
  ReadWalletResponse,
} from '@trackterra/proto-schema/wallet';
import { WalletsService } from './wallets.service';

@Controller('/api/v1/wallets')
@ApiTags('Wallet')
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}

  @Get('/:address')
  @ApiOkResponse({ description: 'Done checking wallet' })
  async readWallet(
    @Param('address') address: string,
  ): Promise<ReadWalletResponse> {
    return this.walletsService.readWallet(address);
  }

  @Get('/detail/:address')
  @ApiOkResponse({ description: 'Wallet detail info retrieved successfully' })
  async getWalletDetail(
    @Param('address') address: string,
  ): Promise<ReadWalletDetailResponse> {
    return this.walletsService.getWalletDetail(address);
  }

  @Put('/parse/:address')
  @ApiOkResponse({ description: 'Done parsing wallet' })
  async parseWallet(
    @Param('address') address: string,
  ): Promise<ParseWalletResponse> {
    return this.walletsService.parseWallet(address);
  }
}
