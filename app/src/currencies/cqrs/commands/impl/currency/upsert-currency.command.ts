import { ICommand } from '@nestjs/cqrs';
import { UpsertCurrencyRequest } from '@trackterra/app/currencies/currency.types';

export class UpsertCurrencyCommand implements ICommand {
  constructor(public readonly input: UpsertCurrencyRequest) {}
}
