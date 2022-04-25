import { Directive, Field, ObjectType } from '@nestjs/graphql';
import { Node } from '@trackterra/contracts';
import { Filterable } from '@trackterra/core';

@ObjectType()
export class CurrencyType {}

@Directive(`@key(fields: "id")`)
@ObjectType()
export class CurrencyObject extends Node {
  @Field()
  name: string;

  @Field()
  symbol: string;

  @Field()
  decimals: number;

  @Field()
  icon: number;

  @Filterable()
  @Field()
  identifier: string;
}
