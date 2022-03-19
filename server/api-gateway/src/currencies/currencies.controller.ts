import { Controller, Get, Param, Put } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ContractRpcClientService } from '@trackterra/core';
import { Currency as CurrencyRpc } from '@trackterra/proto-schema/contract';
import { CurrencyFilterArgs } from './types';

@Controller('/api/v1/currencies')
@ApiTags('Currency')
export class CurrenciesController {
  constructor(private readonly currency: ContractRpcClientService) {}

  @Get('/')
  @ApiOkResponse({ description: 'Done fiding currency' })
  async findCurrencies(): Promise<CurrencyRpc[]> {
    const result = await this.currency.svc.listCurrencies({}).toPromise();
    return result.currencies;
  }
}
