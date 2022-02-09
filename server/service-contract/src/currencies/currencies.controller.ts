import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GrpcMethod } from '@nestjs/microservices';
import {
  GetCurrencyQuery,
  GetCurrenciesQuery,
  UpsertCurrencyCommand,
} from './cqrs';
import { ContractService, FindCurrenciesRequest, FindCurrenciesResponse, FindCurrencyRequest, FindCurrencyResponse, UpsertCurrencyRequest, UpsertCurrencyResponse } from '@trackterra/proto-schema/contract';

@Controller('currencies')
export class CurrenciesController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @GrpcMethod('ContractService')
  upsertCurrency(
    request: UpsertCurrencyRequest,
    ctx: any,
  ): Promise<UpsertCurrencyResponse> {
    return this.commandBus.execute(
      new UpsertCurrencyCommand(request),
    );
  }

  @GrpcMethod('ContractService')
  listCurrencies(
    request: FindCurrenciesRequest,
    ctx: any,
  ): Promise<FindCurrenciesResponse> {
    return this.queryBus.execute(
      new GetCurrenciesQuery(request),
    );
  }

  @GrpcMethod('ContractService')
  findCurrency(
    request: FindCurrencyRequest,
    ctx: any,
  ): Promise<FindCurrencyResponse> {
    return this.queryBus.execute(
      new GetCurrencyQuery(request),
    );
  }
}
