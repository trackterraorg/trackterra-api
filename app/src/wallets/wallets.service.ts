import { Controller } from '@nestjs/common';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  CreateTxsCommand,
  GetWalletDetailQuery,
  GetWalletQuery,
  GetWalletsQuery,
  GetWalletTxsQuery,
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
  FindTxsResponse,
} from '@trackterra/proto-schema/wallet';
import { WalletRepository } from '@trackterra/repository';
import { FindTxsDto } from '@trackterra/repository/dtos/request/find-txs.dto';
import { queryMapper } from '@trackterra/common';

@Controller('wallet')
export class WalletsService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly walletRepository: WalletRepository,
  ) {}

  parseWallet(request: ParseWalletRequest): Promise<ParseWalletResponse> {
    return this.commandBus.execute(new ParseWalletCommand(request));
  }

  createTxs(request: CreateTxsRequest): Promise<CreateTxsResponse> {
    return this.commandBus.execute(new CreateTxsCommand(request));
  }

  findWallets(request: FindWalletsRequest): Promise<FindWalletsResponse> {
    return this.queryBus.execute(
      new GetWalletsQuery(this.walletRepository, request),
    );
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
    { taxapp, q, page, take, order, orderBy, csv }: FindTxsDto,
  ): Promise<FindTxsResponse> {
    const filter = q ? JSON.stringify(queryMapper(q)) : q;

    const result = await this.queryBus.execute(
      new GetWalletTxsQuery({
        address,
        filter,
        paginate: {
          skip: ((page ?? 1) - 1) * take,
          limit: take,
        },
        orderBy,
        order,
        taxapp,
        csv,
      }),
    );

    return result;
  }
}
