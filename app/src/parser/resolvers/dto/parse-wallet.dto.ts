import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ParseWalletRequestObject {
  @Field()
  address: string;

  @Field()
  highestParsedBlockHeight?: number;
}

@ObjectType()
export class ParseWalletResponseObject {
  @Field()
  numberOfNewParsedTxs: number;

  @Field()
  status: number;

  @Field()
  msg: string;
}
