import { IQuery } from '@nestjs/cqrs';

export class GetCurrenciesQuery implements IQuery {
  constructor(public readonly chain: string) {}
}
