import { Int, ArgsType, Field, InputType } from '@nestjs/graphql';
import { CursorScaler } from '@trackterra/core/scalers';
@InputType()
export class PaginationInput {
  @Field(() => Int)
  skip: number = 0;

  @Field(() => Int)
  limit: number = 10;
}

@InputType()
export class ConnectionPaginationInput {
  @Field(() => Int, { nullable: true })
  first: number | 10;

  @Field(() => Int, { nullable: true })
  last: number | 0;

  @Field(() => CursorScaler, { nullable: true })
  after: string | undefined;

  @Field(() => CursorScaler, { nullable: true })
  before: string | undefined;
}

@ArgsType()
export class PaginationArgs {
  @Field(() => PaginationInput)
  paginate?: PaginationInput;
}

@InputType()
export class PriceInput {
  @Field()
  price: number;

  @Field()
  currency: string;

  @Field({ nullable: true })
  id?: string;

  @Field()
  nickname: string;

  @Field(() => Int, { nullable: true })
  trialDays?: number;

  @Field(() => Int, {
    nullable: true,
    description:
      'The interval cunt for the field interval, eg. for interval MONTH, you can pass 3',
  })
  intervalCount?: number;
}

@InputType()
export class KeyValuePairInput {
  @Field()
  key: string;

  @Field({ nullable: true })
  value?: string;
}

@InputType()
export class FeatureInput {
  @Field()
  name: string;

  @Field()
  normalizedName!: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Int, { nullable: true })
  min?: number;

  @Field(() => Int, { nullable: true })
  max?: number;

  @Field()
  active: boolean;

  @Field()
  full: boolean;
}
