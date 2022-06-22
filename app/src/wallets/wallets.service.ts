import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  CreateTxsCommand,
  GetWalletDetailQuery,
  GetWalletQuery,
  GetWalletTxsQuery,
  ParseWalletCommand,
  UpdateWalletCommand,
} from './cqrs';

import { WalletRequest, ParseWalletResponse } from '../parser/parser.types';
import {
  CreateTxsRequest,
  CreateTxsResponse,
  FindTxsRequest,
  FindTxsResponse,
  ReadWalletDetailRequest,
  ReadWalletDetailResponse,
  ReadWalletRequest,
  ReadWalletResponse,
  UpdateWalletRequest,
  UpdateWalletResponse,
} from './wallet.types';

@Controller('wallet')
export class WalletsService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  parseWallet(request: WalletRequest): Promise<ParseWalletResponse> {
    return this.commandBus.execute(new ParseWalletCommand(request));
  }

  createTxs(request: CreateTxsRequest): Promise<CreateTxsResponse> {
    return this.commandBus.execute(new CreateTxsCommand(request));
  }

  updateWallet(request: UpdateWalletRequest): Promise<UpdateWalletResponse> {
    return this.commandBus.execute(new UpdateWalletCommand(request));
  }

  readWallet(request: ReadWalletRequest): Promise<ReadWalletResponse> {
    return this.queryBus.execute(new GetWalletQuery(request));
  }

  readWalletDetail(
    request: ReadWalletDetailRequest,
  ): Promise<ReadWalletDetailResponse> {
    return this.queryBus.execute(new GetWalletDetailQuery(request));
  }

  async getTxs(
    address: string,
    query: FindTxsRequest,
  ): Promise<FindTxsResponse> {
    const result = await this.queryBus.execute(
      new GetWalletTxsQuery(address, query),
    );

    return result;
  }
}
