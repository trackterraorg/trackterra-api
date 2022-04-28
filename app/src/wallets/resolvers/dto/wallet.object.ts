import { Directive, Field, ObjectType } from '@nestjs/graphql';
import { Node } from '@trackterra/contracts';
import { Filterable } from '@trackterra/core';

@Directive(`@key(fields: "id")`)
@ObjectType()
export class WalletObject extends Node {
  @Filterable()
  @Field()
  address: string;

  @Field({ nullable: true })
  highestParsedBlock: number;

  @Field({ nullable: true })
  status: number;
}

@ObjectType()
export class WalletExtrasObject {
  @Field({ nullable: true })
  sAddress: string;

  @Field({ nullable: true })
  parsed: boolean;
}

@ObjectType()
export class TopActiveContractObject {
  @Field({ nullable: true })
  contract: string;

  @Field({ nullable: true })
  count: number;
}

@ObjectType()
export class TopOperationObject {
  @Field({ nullable: true })
  operation: string;

  @Field({ nullable: true })
  count: number;
}

@ObjectType()
export class ReadWalletResponseObject {
  @Field()
  wallet: WalletObject;

  @Field()
  extras: WalletExtrasObject | undefined;
}

@ObjectType()
export class ReadWalletDetailResponseObject {
  @Field()
  address: string;

  @Field({ nullable: true })
  txCount: number;

  @Field({ nullable: true })
  unclassifiedTxCount: number;

  @Field({ nullable: true })
  lastParsingTime: string;

  @Field({ nullable: true })
  highestParsedBlock: number;

  @Field(() => [TopActiveContractObject!], { nullable: true })
  topActiveContracts: TopActiveContractObject[];

  @Field(() => [TopOperationObject!], { nullable: true })
  topOperations: TopOperationObject[];
}

@ObjectType()
export class CheckWalletResponseObject {
  @Field()
  exist: boolean;

  @Field()
  parsed: boolean;
}
