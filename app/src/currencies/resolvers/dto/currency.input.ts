import { Field, InputType } from '@nestjs/graphql';
import { Chain } from '@trackterra/chains/enums/chain.enum';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class UpsertCurrencyInput {
  @Field((type) => Chain)
  chain: Chain;

  @Field()
  @IsNotEmpty()
  identifier: string;
}
