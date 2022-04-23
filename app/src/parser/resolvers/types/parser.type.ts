import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SupportedProtocolType {
  @Field({ nullable: true })
  protocolName: string;

  @Field({ nullable: true })
  txType: string;
}

@ObjectType()
export class ParserQuery {}
