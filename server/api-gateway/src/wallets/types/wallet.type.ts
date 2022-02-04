import { Directive, Field, ObjectType } from '@nestjs/graphql';
import { Node } from '@trackterra/contracts';
import { Filterable } from '@trackterra/core';
import { ParseStatusScalar } from '@trackterra/core/scalers/parse-status.scalar';

@ObjectType()
export class WalletType {}

@Directive(`@key(fields: "id")`)
@ObjectType()
export class Wallet extends Node {
  @Filterable()
  @Field()
  address: string;
}

@ObjectType()
export class TopActiveContract {
  @Field({ nullable: true })
  contract: string;

  @Field({ nullable: true })
  count: number;
}
@ObjectType()
export class WalletDetailType extends Node {
  @Field()
  address: string;

  @Field({ nullable: true })
  txCount: number;

  @Field({ nullable: true })
  lastParsingTime: string;

  @Field({ nullable: true })
  highestParsedBlock: number;

  @Field(() => [TopActiveContract!], { nullable: true })
  topActiveContracts: TopActiveContract[];
}

@ObjectType()
export class ParsingResponse {
  @Field({ nullable: true })
  numberOfNewParsedTxs: number;

  @Field(() => ParseStatusScalar, { nullable: true })
  status: number;

  @Field({ nullable: true })
  msg: string;
}

@ObjectType()
export class CheckWalletResponseType {
  @Field()
  exist: boolean;

  @Field()
  parsed: boolean;
}

@ObjectType()
export class WalletMutations {}
