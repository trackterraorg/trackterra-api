import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GrpcMethod } from '@nestjs/microservices';
import {
  GetCurrencyQuery,
  GetCurrenciesQuery,
} from './cqrs';
import { CurrencyService, FindCurrenciesRequest, FindCurrenciesResponse, FindCurrencyRequest, FindCurrencyResponse } from '@trackterra/proto-schema/currency';

@Controller('currencies')
export class CurrenciesController implements CurrencyService<any> {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @GrpcMethod('CurrencyService')
  listCurrencies(
    request: FindCurrenciesRequest,
    ctx: any,
  ): Promise<FindCurrenciesResponse> {
    return this.queryBus.execute(
      new GetCurrenciesQuery(request),
    );
  }

  @GrpcMethod('CurrencyService')
  findCurrency(
    request: FindCurrencyRequest,
    ctx: any,
  ): Promise<FindCurrencyResponse> {
    return this.queryBus.execute(
      new GetCurrencyQuery(request),
    );
  }
}
