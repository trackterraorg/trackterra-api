import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { Chain } from '@trackterra/chains/enums/chain.enum';
import { FilterMongo, PaginationInput } from '@trackterra/contracts';
import { Order } from '@trackterra/repository';
import { TaxApp } from '@trackterra/tax-apps/enums/taxapp.enum';
import { TxObject } from './tx.object';

@InputType()
export class TxFilterInput extends FilterMongo(TxObject, {
  simple: true,
}) {}

@ArgsType()
export class TxFilterArgs {
  @Field((type) => Chain)
  chain: Chain;

  @Field({ nullable: true })
  address: string;

  @Field(() => TaxApp)
  public taxapp: TaxApp;

  @Field(() => TxFilterInput, { nullable: true })
  q?: TxFilterInput;

  @Field(() => PaginationInput, { nullable: true })
  paginate?: PaginationInput;

  @Field({ nullable: true })
  orderBy: string;

  @Field(() => Order)
  order?: Order;
}
