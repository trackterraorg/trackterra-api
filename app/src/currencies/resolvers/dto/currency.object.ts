import { Directive, Field, ObjectType } from '@nestjs/graphql';
import { Chain } from '@trackterra/chains/enums/chain.enum';
import { Node } from '@trackterra/contracts';
import { Filterable } from '@trackterra/core';

@ObjectType()
export class CurrencyType {}

@Directive(`@key(fields: "id")`)
@ObjectType()
export class CurrencyObject extends Node {
  @Field((type) => Chain)
  chain: Chain;

  @Field()
  name: string;

  @Field()
  symbol: string;

  @Field()
  nullIndex: number;

  @Field()
  decimals: number;

  @Field()
  icon: string;

  @Filterable()
  @Field()
  identifier: string;

  @Field()
  isStable: boolean;
}
