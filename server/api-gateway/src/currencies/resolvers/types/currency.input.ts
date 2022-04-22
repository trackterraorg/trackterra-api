import { ArgsType, Field, ID, InputType } from '@nestjs/graphql';
import { FilterMongo, PaginationInput } from '@trackterra/contracts';
import { Currency } from './currency.type';

@InputType()
export class CurrencyFilterInput extends FilterMongo(Currency, {
  simple: true,
}) {}

@ArgsType()
export class CurrencyFilterArgs {
  @Field(() => CurrencyFilterInput, { nullable: true })
  where?: CurrencyFilterInput;

  @Field(() => PaginationInput, { nullable: true })
  paginate?: PaginationInput;
}
