import { Controller, Get, Param, Put } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { WalletsRpcClientService } from '@trackterra/core';
import {
  ParseWalletResponse,
  ReadWalletDetailResponse,
  ReadWalletResponse,
} from '@trackterra/proto-schema/wallet';

@Controller('/api/v1/wallets')
@ApiTags('Wallet')
export class WalletsController {
  constructor(private readonly wallet: WalletsRpcClientService) {}

  @Get('/:address')
  @ApiOkResponse({ description: 'Done checking wallet' })
  async readWallet(
    @Param('address') address: string,
  ): Promise<ReadWalletResponse> {
    const result = await this.wallet.svc
      .readWallet({
        address,
      })
      .toPromise();

    if (!result) {
      throw new RpcException('Could not read wallet!');
    }

    return result;
  }

  @Get('/detail/:address')
  @ApiOkResponse({ description: 'Wallet detail info retrieved successfully' })
  async getWalletDetail(
    @Param('address') address: string,
  ): Promise<ReadWalletDetailResponse> {
    const result = await this.wallet.svc
      .readWalletDetail({
        address,
      })
      .toPromise();

    if (!result) {
      throw new RpcException('Could not fetch txs!');
    }
    return result;
  }

  @Put('/parse/:address')
  @ApiOkResponse({ description: 'Done parsing wallet' })
  async parseWallet(
    @Param('address') address: string,
  ): Promise<ParseWalletResponse> {
    const result = await this.wallet.svc
      .parseWallet({
        address,
      })
      .toPromise();
    return result;
  }
}
