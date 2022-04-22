import {
  Mutation,
  Resolver,
  Query,
  Args,
  Context,
  ResolveField,
} from '@nestjs/graphql';
import { Currency, CurrencyFilterArgs } from './types';
import { Currency as CurrencyRpc } from '@trackterra/proto-schema/contract';
import { CurrenciesService } from '../currencies.service';

@Resolver()
export class CurrenciesResolver {
  constructor(private readonly currenciesService: CurrenciesService) {}

  @Query(() => [Currency], { nullable: true })
  async listCurrencies(
    @Args() { where, paginate }: CurrencyFilterArgs,
  ): Promise<CurrencyRpc[]> {
    const filter = JSON.stringify(where);
    const result = await this.currenciesService.listCurrencies({
      filter,
      paginate,
    });
    return result.currencies;
  }
}
