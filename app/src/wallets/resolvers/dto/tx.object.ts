import { Directive, Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { Chain } from '@trackterra/chains/enums/chain.enum';
import { Node } from '@trackterra/contracts';
import { BaseDto } from '@trackterra/repository/dtos';
import { Expose, Type } from 'class-transformer';

@Directive(`@key(fields: "id")`)
@ObjectType()
export class TxObject extends Node {
  @Field((type) => Chain)
  chain: Chain;

  @Field()
  txhash: string;

  @Field()
  blockHeight: string;

  @Field()
  timestamp: string;

  @Field()
  protocol: string;

  @Field()
  label: string;

  @Field()
  tag: string;

  @Field()
  walletAddress: string;

  @Field({ nullable: true })
  contract: string;

  @Field({ nullable: true })
  sender: string;

  @Field({ nullable: true })
  recipient: string;

  @Field({ nullable: true })
  receivedAmount: string;

  @Field({ nullable: true })
  receivedToken: string;

  @Field({ nullable: true })
  receivedTokenContract: string;

  @Field({ nullable: true })
  sentAmount: string;

  @Field({ nullable: true })
  sentToken: string;

  @Field({ nullable: true })
  sentTokenContract: string;

  @Field({ nullable: true })
  feeAmount: string;

  @Field({ nullable: true })
  feeToken: string;

  @Field({ nullable: true })
  taxAmount: string;

  @Field({ nullable: true })
  taxToken: string;

  @Field({ nullable: true })
  memo: string;

  @Field({ nullable: true })
  friendlyDescription: string;
}

@ObjectType()
export class TxExtraObject {
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
export class TxNodeObject {
  @Field({ nullable: true })
  tx: TxObject | undefined;

  @Field({ nullable: true })
  extras: TxExtraObject | undefined;
}
@ObjectType()
export class FindTxsResponseObject {
  @Field(() => [TxNodeObject], { nullable: true })
  txs?: TxNodeObject[];

  @Field({ nullable: true })
  totalCount?: number;

  @Field({ nullable: true })
  csvFileName?: string;
}
