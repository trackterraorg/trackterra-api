import { Resolver, Query } from '@nestjs/graphql';
import { CurrencyObject } from './dto';
import { CurrenciesService } from '../currencies.service';

@Resolver()
export class CurrenciesResolver {
  constructor(private readonly currenciesService: CurrenciesService) {}

  @Query(() => [CurrencyObject], { nullable: true })
  async listCurrencies(): Promise<CurrencyObject[]> {
    const result = await this.currenciesService.listCurrencies();
    return result.currencies;
  }
}
