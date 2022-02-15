import { ArgsType, Field, ID, InputType } from '@nestjs/graphql';
import {
  ConnectionPaginationInput,
  FilterMongo,
  PaginationInput,
} from '@trackterra/contracts';
import { Tx } from './wallet-tx.type';

@InputType()
export class TxInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;
}

@InputType()
export class DeleteTxInput {
  @Field(() => ID)
  id: string;
}

@ArgsType()
export class TxMutationInput {
  @Field(() => DeleteTxInput, { nullable: true })
  delete: DeleteTxInput;
}

@InputType()
export class TxFilterInput extends FilterMongo(Tx, {
  simple: true,
}) {}

@ArgsType()
export class TxFilterArgs {
  @Field()
  address: string;

  @Field()
  csv: boolean;

  @Field()
  taxapp: string;

  @Field(() => TxFilterInput, { nullable: true })
  where?: TxFilterInput;

  @Field(() => PaginationInput, { nullable: true })
  paginate?: PaginationInput;

  @Field()
  order: string;

  @Field()
  orderBy: string;
}
