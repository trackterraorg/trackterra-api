import { ICommand } from '@nestjs/cqrs';
import { UpsertCurrencyRequest } from '@trackterra/proto-schema/contract';

export class UpsertCurrencyCommand implements ICommand {
  constructor(public readonly input: UpsertCurrencyRequest) {}
}
