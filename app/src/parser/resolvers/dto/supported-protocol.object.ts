import { Field, ObjectType } from '@nestjs/graphql';
import { Chain } from '@trackterra/chains/enums/chain.enum';

export class SupportedProtocolRequestObject {
  @Field((type) => Chain)
  chain: Chain;
}

@ObjectType()
export class SupportedProtocolResponseObject {
  @Field((type) => Chain)
  chain: Chain;

  @Field({ nullable: true })
  protocolName: string;

  @Field({ nullable: true })
  txType: string;
}
