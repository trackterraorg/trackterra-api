import { Controller } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { WalletsRpcClientService } from '@trackterra/core';
import {
  ParseWalletResponse,
  ReadWalletDetailResponse,
  ReadWalletResponse,
} from '@trackterra/proto-schema/wallet';

@Controller()
export class WalletsService {
  constructor(private readonly wallet: WalletsRpcClientService) {}

  async readWallet(address: string): Promise<ReadWalletResponse> {
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

  async getWalletDetail(address: string): Promise<ReadWalletDetailResponse> {
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

  async parseWallet(address: string): Promise<ParseWalletResponse> {
    const result = await this.wallet.svc
      .parseWallet({
        address,
      })
      .toPromise();
    return result;
  }
}
