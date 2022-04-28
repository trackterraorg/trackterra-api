import { ArgsType, Field, ID, InputType } from '@nestjs/graphql';
import { FilterMongo, PaginationInput } from '@trackterra/contracts';
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
  @Field()
  address: string;
}
