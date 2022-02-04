import { Args, Context, ResolveField, Resolver } from '@nestjs/graphql';
import { DeleteTxInput, Tx, TxMutations } from './types';
import { GqlContext, setRpcContext } from '@trackterra/core';
import { Tx as RpcTx } from '@trackterra/proto-schema/wallet';

@Resolver(() => TxMutations)
export class TxsMutationResolver {
  @ResolveField(() => Tx)
  async delete(
    @Args('input') input: DeleteTxInput,
    @Context() ctx: GqlContext,
  ): Promise<RpcTx> {
    const result = await ctx?.rpc?.wallet.svc
      .deleteTx(
        {
          id: input.id,
        },
        setRpcContext(ctx),
      )
      .toPromise();

    return result.tx;
  }
}
