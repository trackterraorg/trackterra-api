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

@InputType()
export class WalletFilterInput extends FilterMongo(WalletObject, {
  simple: true,
}) {}

@ArgsType()
export class WalletFilterArgs {
  @Field({ nullable: true })
  address?: string;

  @Field(() => WalletFilterInput, { nullable: true })
  where?: WalletFilterInput;

  @Field(() => PaginationInput, { nullable: true })
  paginate?: PaginationInput;
}

@ArgsType()
export class WalletCheckArg {
  @Field()
  address: string;
}

@ArgsType()
export class ReadWalletRequestObject {
  @Field({ nullable: true })
  address: string;
}

@ArgsType()
export class ReadWalletDetailRequestObject {
  @Field({ nullable: true })
  address: string;
}
