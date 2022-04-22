import { IQuery } from '@nestjs/cqrs';
import { FindCurrenciesRequest } from '@trackterra/proto-schema/contract';

export class GetCurrenciesQuery implements IQuery {
  constructor(public readonly input?: FindCurrenciesRequest) {}
}
