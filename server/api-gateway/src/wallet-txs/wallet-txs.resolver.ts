import { Mutation, Resolver, Query, Args, Context } from '@nestjs/graphql';
import {
  FindTxsResponseResultType,
  Tx,
  TxFilterArgs,
  TxMutations,
} from './types';
import { GqlContext, setRpcContext } from '@trackterra/core';
import { FindTxsResponse, Tx as TxRpc } from '@trackterra/proto-schema/wallet';

@Resolver(() => Tx)
export class TxsResolver {
  @Mutation(() => TxMutations, { name: 'tx', nullable: true })
  txMutations() {
    return {};
  }

  @Query(() => Tx)
  async tx(
    @Args() { address, where }: TxFilterArgs,
    @Context() ctx: GqlContext,
  ): Promise<TxRpc> {
    const filter = JSON.stringify(where);
    const result = await ctx?.rpc?.wallet?.svc
      .readTx({ filter }, ctx)
      .toPromise();
    return result.tx;
  }

  @Query(() => FindTxsResponseResultType, { nullable: true })
  async txs(
    @Args() { address, csv, taxapp, order, orderBy, where, paginate }: TxFilterArgs,
    @Context() ctx: GqlContext,
  ): Promise<FindTxsResponse> {
    const params = {
      address,
      csv,
      taxapp,
      filter: JSON.stringify(where),
      paginate,
      order,
      orderBy,
    };

    const result = await ctx?.rpc?.wallet?.svc
      .findTxs(params, setRpcContext(ctx))
      .toPromise();

    return result;
  }
}
