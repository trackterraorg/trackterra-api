import { IQuery } from '@nestjs/cqrs';
import { FindCurrencyRequest } from '@trackterra/proto-schema/contract';

export class GetCurrencyQuery implements IQuery {
  constructor(public readonly input: FindCurrencyRequest) {}
}
