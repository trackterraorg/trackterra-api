import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetCurrenciesQuery, UpsertCurrencyCommand } from './cqrs';
import {
  UpsertCurrencyRequest,
  UpsertCurrencyResponse,
} from './currency.types';

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
}
