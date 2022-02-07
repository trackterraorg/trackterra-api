import { Directive, Field, ObjectType } from '@nestjs/graphql';
import { Node } from '@trackterra/contracts';
import { Filterable } from '@trackterra/core';
import { ParseStatusScalar } from '@trackterra/core/scalers/parse-status.scalar';

@ObjectType()
export class CurrencyType {}

@Directive(`@key(fields: "id")`)
@ObjectType()
export class Currency extends Node {
  @Filterable()
  @Field()
  name: string;

  @Filterable()
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

