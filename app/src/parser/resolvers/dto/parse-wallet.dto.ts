import { Field, ObjectType } from '@nestjs/graphql';
import { Chain } from '@trackterra/chains/enums/chain.enum';

@ObjectType()
export class WalletRequestObject {
  @Field((type) => Chain)
  chain: Chain;

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
