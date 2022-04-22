import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  GetCurrencyQuery,
  GetCurrenciesQuery,
  UpsertCurrencyCommand,
} from './cqrs';
import {
  FindCurrenciesRequest,
  FindCurrenciesResponse,
  FindCurrencyRequest,
  FindCurrencyResponse,
  UpsertCurrencyRequest,
  UpsertCurrencyResponse,
} from '@trackterra/proto-schema/contract';

@Controller('currencies')
export class CurrenciesService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  upsertCurrency(
    request: UpsertCurrencyRequest,
  ): Promise<UpsertCurrencyResponse> {
    return this.commandBus.execute(new UpsertCurrencyCommand(request));
  }

  listCurrencies(
    request: FindCurrenciesRequest,
  ): Promise<FindCurrenciesResponse> {
    return this.queryBus.execute(new GetCurrenciesQuery(request));
  }

  findCurrency(request: FindCurrencyRequest): Promise<FindCurrencyResponse> {
    return this.queryBus.execute(new GetCurrencyQuery(request));
  }
}
