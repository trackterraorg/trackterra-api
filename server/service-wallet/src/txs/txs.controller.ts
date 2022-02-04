import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { TxRepository, WalletRepository } from '@trackterra/repository';
import {
  CreateTxRequest,
  CreateTxResponse,
  DeleteTxRequest,
  DeleteTxResponse,
  FindTxsRequest,
  FindTxsResponse,
  PickUnparsedTxsRequest,
  PickUnparsedTxsResponse,
  ReadTxRequest,
  ReadTxResponse,
} from '@trackterra/proto-schema/wallet';
import { GrpcMethod } from '@nestjs/microservices';
import {
  DeleteTxCommand,
  GetTxQuery,
  GetTxsQuery,
  PickUnparsedTxsQuery,
} from './cqrs';

@Controller('txs')
export class TxsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly walletRepository: WalletRepository,
    private readonly txRepository: TxRepository,
  ) {}

  @GrpcMethod('WalletService')
  createTx(request: CreateTxRequest, ctx: any): Promise<CreateTxResponse> {
    throw new Error('Method not implemented.');
  }

  @GrpcMethod('WalletService')
  pickUnparsedTxs(
    request: PickUnparsedTxsRequest,
    ctx: any,
  ): Promise<PickUnparsedTxsResponse> {
    return this.queryBus.execute(
      new PickUnparsedTxsQuery(request, this.txRepository),
    );
  }

  @GrpcMethod('WalletService')
  deleteTx(request: DeleteTxRequest, ctx: any): Promise<DeleteTxResponse> {
    return this.commandBus.execute(
      new DeleteTxCommand(request, this.txRepository),
    );
  }

  @GrpcMethod('WalletService')
  findTxs(request: FindTxsRequest, ctx: any): Promise<FindTxsResponse> {
    return this.queryBus.execute(new GetTxsQuery(this.txRepository, request));
  }

  @GrpcMethod('WalletService')
  readTx(request: ReadTxRequest, ctx: any): Promise<ReadTxResponse> {
    return this.queryBus.execute(new GetTxQuery(request, this.txRepository));
  }
}
