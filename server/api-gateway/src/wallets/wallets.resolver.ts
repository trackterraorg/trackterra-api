import {
  Mutation,
  Resolver,
  Query,
  Args,
  Context,
  ResolveField,
} from '@nestjs/graphql';
import {
  CheckWalletResponseType,
  Wallet,
  WalletDetailType,
  WalletFilterArgs,
  WalletMutations,
} from './types';
import { GqlContext, setRpcContext } from '@trackterra/core';
import {
  ReadWalletDetailResponse as ReadWalletDetailResponseRpc,
  Wallet as WalletRpc,
} from '@trackterra/proto-schema/wallet';

@Resolver()
export class WalletsResolver {
  @Mutation(() => WalletMutations, { name: 'wallet', nullable: true })
  walletMutations() {
    return {};
  }

  @Query(() => Wallet)
  async wallet(
    @Args() { address }: WalletFilterArgs,
    @Context() ctx: GqlContext,
  ): Promise<WalletRpc> {
    const result = await ctx?.rpc?.wallet?.svc
      .readWallet({ address }, ctx)
      .toPromise();
    return result.wallet;
  }

  @Query(() => WalletDetailType, { nullable: true })
  async walletDetail(
    @Args('address') address: string,
    @Context() ctx: GqlContext,
  ): Promise<ReadWalletDetailResponseRpc> {
    const result = await ctx?.rpc?.wallet?.svc
      .readWalletDetail({ address }, ctx)
      .toPromise();
    return result;
  }

  @Query(() => [Wallet], { nullable: true })
  async wallets(
    @Args() { where, paginate }: WalletFilterArgs,
    @Context() ctx: GqlContext,
  ): Promise<WalletRpc[]> {
    const filter = JSON.stringify(where);
    const result = await ctx?.rpc?.wallet?.svc
      .findWallets({ filter, paginate }, ctx)
      .toPromise();
    return result.wallets;
  }
}
