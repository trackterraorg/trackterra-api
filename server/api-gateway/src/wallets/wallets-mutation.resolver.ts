import { Args, Context, ResolveField, Resolver } from '@nestjs/graphql';
import { ParseWalletInput, ParsingResponse, WalletMutations } from './types';
import { GqlContext, setRpcContext } from '@trackterra/core';
import {
  ParseWalletResponse as RpcParsingResponse,
  ParseWalletRequest,
} from '@trackterra/proto-schema/wallet';

@Resolver(() => WalletMutations)
export class WalletsMutationResolver {
  @ResolveField(() => ParsingResponse)
  async parseWallet(
    @Args('input') input: ParseWalletInput,
    @Context() ctx: GqlContext,
  ): Promise<RpcParsingResponse> {
    const result = await ctx?.rpc?.wallet.svc
      .parseWallet(ParseWalletRequest.fromJSON(input), setRpcContext(ctx))
      .toPromise();

    return result;
  }
}
