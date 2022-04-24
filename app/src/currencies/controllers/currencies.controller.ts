import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Currency as CurrencyRpc } from '@trackterra/proto-schema/contract';
import { CurrenciesService } from '../currencies.service';

@Controller('/api/v1/currencies')
@ApiTags('Currency')
export class CurrenciesController {
  constructor(private readonly currenciesService: CurrenciesService) {}

  @Get('/')
  @ApiOkResponse({ description: 'Done fiding currency' })
  async findCurrencies(): Promise<CurrencyRpc[]> {
    const result = await this.currenciesService.listCurrencies({});
    return result.currencies;
  }
}
