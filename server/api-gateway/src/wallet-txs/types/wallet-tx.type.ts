import {
  Directive,
  Field,
  GraphQLISODateTime,
  ObjectType,
} from '@nestjs/graphql';
import { ExtendConnectionType, Node } from '@trackterra/contracts';
import { Filterable, TimestampScalar } from '@trackterra/core';

@Directive(`@key(fields: "id")`)
@ObjectType()
export class Tx extends Node {
  @Field({ nullable: true })
  id: string;

  @Filterable()
  @Field({ nullable: true })
  txhash: string;

  @Filterable()
  @Field({ nullable: true })
  blockHeight: number;

  @Filterable()
  @Field({ nullable: true })
  timestamp: Date;

  @Filterable()
  @Field({ nullable: true })
  label: string;

  @Filterable()
  @Field({ nullable: true })
  tag: string;

  // @Filterable()
  @Field({ nullable: true })
  walletAddress: string;

  @Filterable()
  @Field({ nullable: true })
  contract: string;

  @Filterable()
  @Field({ nullable: true })
  sender: string;

  @Filterable()
  @Field({ nullable: true })
  recipient: string;

  @Filterable()
  @Field({ nullable: true })
  receivedAmount: number;

  @Filterable()
  @Field({ nullable: true })
  receivedToken: string;

  @Filterable()
  @Field({ nullable: true })
  sentAmount: number;

  @Filterable()
  @Field({ nullable: true })
  sentToken: string;

  @Filterable()
  @Field({ nullable: true })
  feeAmount: number;

  @Filterable()
  @Field({ nullable: true })
  feeToken: string;

  @Filterable()
  @Field({ nullable: true })
  taxAmount: number;

  @Filterable()
  @Field({ nullable: true })
  taxToken: string;

  @Filterable()
  @Field({ nullable: true })
  netWorthAmount: number;

  @Filterable()
  @Field({ nullable: true })
  netWorthToken: string;

  @Field({ nullable: true })
  memo: string;

  @Field({ nullable: true })
  friendlyDescription: string;
}

@ObjectType()
export class TxExtra {
  @Field({ nullable: true })
  sTxHash: string;

  @Field({ nullable: true })
  rTimestamp: string;

  @Field({ nullable: true })
  sWalletAddress: string;

  @Field({ nullable: true })
  sContract: string;

  @Field({ nullable: true })
  sSender: string;

  @Field({ nullable: true })
  sRecipient: string;
}
@ObjectType()
export class TxMutations {}

@ObjectType()
export class FindTxsReponseType {
  @Field({ nullable: true })
  tx: Tx;

  @Field({ nullable: true })
  extras: TxExtra;
}
@ObjectType()
export class FindTxsResponseResultType {
  @Field(() => [FindTxsReponseType], { nullable: true })
  txs?: FindTxsReponseType[];

  @Field({ nullable: true })
  totalCount?: number;
}
