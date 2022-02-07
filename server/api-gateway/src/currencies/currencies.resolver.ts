import {
  Mutation,
  Resolver,
  Query,
  Args,
  Context,
  ResolveField,
} from '@nestjs/graphql';
import {
  Currency,
  CurrencyFilterArgs,
} from './types';
import { GqlContext, setRpcContext } from '@trackterra/core';
import {
  Currency as CurrencyRpc,
} from '@trackterra/proto-schema/currency';

@Resolver()
export class CurrenciesResolver {

  @Query(() => [Currency], { nullable: true })
  async listCurrencies(
    @Args() { where, paginate }: CurrencyFilterArgs,
    @Context() ctx: GqlContext,
  ): Promise<CurrencyRpc[]> {
    const filter = JSON.stringify(where);
    const result = await ctx?.rpc?.currency?.svc
      .listCurrencies({ filter, paginate }, ctx)
      .toPromise();
    return result.currencies;
  }
}
