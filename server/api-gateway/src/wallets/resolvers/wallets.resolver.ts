import { Mutation, Resolver, Query, Args, Context } from '@nestjs/graphql';
import {
  ParseWalletInput,
  Wallet,
  WalletDetailType,
  WalletFilterArgs,
  WalletMutations,
} from './types';
import {
  ReadWalletDetailResponse as ReadWalletDetailResponseRpc,
  Wallet as WalletRpc,
} from '@trackterra/proto-schema/wallet';
import { WalletsService } from '../wallets.service';

@Resolver()
export class WalletsResolver {
  constructor(private readonly walletsService: WalletsService) {}

  @Mutation(() => Wallet)
  async parseWallet(@Args('input') { address }: ParseWalletInput) {
    const result = await this.walletsService.parseWallet({
      address,
    });

    return result;
  }

  @Query(() => Wallet)
  async readWallet(@Args() { address }: WalletFilterArgs) {
    const result = await this.walletsService.readWallet({
      address,
    });
    return result;
  }

  @Query(() => WalletDetailType, { nullable: true })
  async readWalletDetail(
    @Args('address') address: string,
  ): Promise<ReadWalletDetailResponseRpc> {
    const result = await this.walletsService.readWalletDetail({ address });
    return result;
  }

  @Query(() => [Wallet], { nullable: true })
  async findWallets(
    @Args() { where, paginate }: WalletFilterArgs,
  ): Promise<WalletRpc[]> {
    const filter = JSON.stringify(where);
    const result = await this.walletsService.findWallets({ filter, paginate });
    return result.wallets;
  }
}
