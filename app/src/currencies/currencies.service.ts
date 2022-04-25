import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  GetCurrencyQuery,
  GetCurrenciesQuery,
  UpsertCurrencyCommand,
} from './cqrs';
import {
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

  async upsertCurrency(
    request: UpsertCurrencyRequest,
  ): Promise<UpsertCurrencyResponse> {
    return this.commandBus.execute(new UpsertCurrencyCommand(request));
  }

  async listCurrencies() {
    return await this.queryBus.execute(new GetCurrenciesQuery());
  }

  async findCurrency(
    request: FindCurrencyRequest,
  ): Promise<FindCurrencyResponse> {
    return this.queryBus.execute(new GetCurrencyQuery(request));
  }
}
