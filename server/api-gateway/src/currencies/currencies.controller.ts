import { Controller, Get, Param, Put } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CurrencyRpcClientService } from '@trackterra/core';
import {
  Currency as CurrencyRpc,
} from '@trackterra/proto-schema/currency';
import { CurrencyFilterArgs } from './types';

@Controller('/api/v1/currencies')
@ApiTags('Currency')
export class CurrenciesController {
  constructor(private readonly currency: CurrencyRpcClientService) {}

  @Get('/')
  @ApiOkResponse({ description: 'Done fiding currency' })
  async findCurrencies(): Promise<CurrencyRpc[]> {
    const result = await this.currency.svc
      .listCurrencies({})
      .toPromise();
    return result.currencies;
  }
}
