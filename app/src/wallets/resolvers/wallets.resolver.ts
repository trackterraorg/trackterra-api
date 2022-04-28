import { Mutation, Resolver, Query, Args, Context } from '@nestjs/graphql';
import {
  ParseWalletInput,
  WalletObject,
  WalletFilterArgs,
  ReadWalletResponseObject,
  ReadWalletDetailResponseObject,
} from './dto';
import { WalletsService } from '../wallets.service';
import { ParseWalletResponse } from '@trackterra/app/parser/parser.types';

@Resolver()
export class WalletsResolver {
  constructor(private readonly walletsService: WalletsService) {}

  @Mutation(() => WalletObject)
  async parseWallet(
    @Args('input') { address }: ParseWalletInput,
  ): Promise<ParseWalletResponse> {
    const result = await this.walletsService.parseWallet({
      address,
    });

    return result;
  }

  @Query(() => WalletObject)
  async readWallet(
    @Args() { address }: WalletFilterArgs,
  ): Promise<ReadWalletResponseObject> {
    const result = await this.walletsService.readWallet({
      address,
    });
    return result;
  }

  @Query(() => ReadWalletDetailResponseObject, { nullable: true })
  async readWalletDetail(
    @Args('address') address: string,
  ): Promise<ReadWalletDetailResponseObject> {
    const result = await this.walletsService.readWalletDetail({ address });
    return result;
  }
}
