import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class UpsertCurrencyInput {
  @Field()
  @IsNotEmpty()
  identifier: string;
}
