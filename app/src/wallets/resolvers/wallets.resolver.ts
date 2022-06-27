import { Mutation, Resolver, Query, Args, Context } from '@nestjs/graphql';
import {
  WalletObject,
  ReadWalletResponseObject,
  ReadWalletDetailResponseObject,
  WalletFilterAddressArg,
} from './dto';
import { WalletsService } from '../wallets.service';
import { ParseWalletResponse } from '@trackterra/app/parser/parser.types';

@Resolver()
export class WalletsResolver {
  constructor(private readonly walletsService: WalletsService) {}

  @Mutation(() => WalletObject)
  async parseWallet(
    @Args() { chain, address }: WalletFilterAddressArg,
  ): Promise<ParseWalletResponse> {
    const result = await this.walletsService.parseWallet({
      chain,
      address,
    });

    return result;
  }

  @Query(() => WalletObject)
  async readWallet(
    @Args() { chain, address }: WalletFilterAddressArg,
  ): Promise<ReadWalletResponseObject> {
    const result = await this.walletsService.readWallet({
      chain,
      address,
    });
    return result;
  }

  @Query(() => ReadWalletDetailResponseObject, { nullable: true })
  async readWalletDetail(
    @Args() { chain, address }: WalletFilterAddressArg,
  ): Promise<ReadWalletDetailResponseObject> {
    const result = await this.walletsService.readWalletDetail({
      chain,
      address,
    });
    return result;
  }
}
