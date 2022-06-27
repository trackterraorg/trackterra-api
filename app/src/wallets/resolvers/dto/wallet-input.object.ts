import { ArgsType, Field, ID, InputType } from '@nestjs/graphql';
import { Chain } from '@trackterra/chains/enums/chain.enum';
import { FilterMongo, PaginationInput } from '@trackterra/contracts';
import { type } from 'os';
import { WalletObject } from './wallet.object';

@InputType()
export class ParseWallet {
  @Field()
  address: string;
}

@InputType()
export class ParseWalletInput extends ParseWallet {}

@ArgsType()
export class ParseWalletMutationInput {
  @Field(() => ParseWalletInput, { nullable: true })
  parse: ParseWalletInput;
}

@ArgsType()
export class WalletFilterAddressArg {
  @Field((type) => Chain)
  chain: Chain;

  @Field()
  address: string;
}
