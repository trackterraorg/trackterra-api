import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SupportedProtocolObject {
  @Field({ nullable: true })
  protocolName: string;

  @Field({ nullable: true })
  txType: string;
}
