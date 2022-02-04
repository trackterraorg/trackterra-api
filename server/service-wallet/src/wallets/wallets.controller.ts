import { Controller } from '@nestjs/common';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  CreateTxsCommand,
  GetWalletDetailQuery,
  GetWalletQuery,
  GetWalletsQuery,
  ParseWalletCommand,
  UpdateWalletCommand,
} from './cqrs';

import {
  FindWalletsRequest,
  FindWalletsResponse,
  WalletService,
  ParseWalletRequest,
  ParseWalletResponse,
  ReadWalletRequest,
  ReadWalletResponse,
  CreateTxsRequest,
  CreateTxsResponse,
  ReadWalletDetailRequest,
  ReadWalletDetailResponse,
  UpdateWalletRequest,
  UpdateWalletResponse,
} from '@trackterra/proto-schema/wallet';
import { WalletRepository } from '@trackterra/repository';

@Controller('wallet')
export class WalletsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly walletRepository: WalletRepository,
  ) {}

  @GrpcMethod('WalletService')
  parseWallet(
    request: ParseWalletRequest,
    ctx: any,
  ): Promise<ParseWalletResponse> {
    return this.commandBus.execute(new ParseWalletCommand(request));
  }

  @GrpcMethod('WalletService')
  createTxs(request: CreateTxsRequest, ctx: any): Promise<CreateTxsResponse> {
    // console.log(request);

    return this.commandBus.execute(new CreateTxsCommand(request));
  }

  @GrpcMethod('WalletService')
  findWallets(
    request: FindWalletsRequest,
    ctx: any,
  ): Promise<FindWalletsResponse> {
    return this.queryBus.execute(
      new GetWalletsQuery(this.walletRepository, request),
    );
  }

  @GrpcMethod('WalletService')
  updateWallet(
    request: UpdateWalletRequest,
    ctx: any,
  ): Promise<UpdateWalletResponse> {
    return this.commandBus.execute(new UpdateWalletCommand(request));
  }

  @GrpcMethod('WalletService')
  readWallet(
    request: ReadWalletRequest,
    ctx: any,
  ): Promise<ReadWalletResponse> {
    return this.queryBus.execute(new GetWalletQuery(request));
  }

  @GrpcMethod('WalletService')
  readWalletDetail(
    request: ReadWalletDetailRequest,
    ctx: any,
  ): Promise<ReadWalletDetailResponse> {
    return this.queryBus.execute(new GetWalletDetailQuery(request));
  }
}
