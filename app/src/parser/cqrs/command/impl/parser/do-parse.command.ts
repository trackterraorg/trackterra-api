import { ICommand } from '@nestjs/cqrs';
import { ParseWalletRequest } from '@trackterra/proto-schema/parser';

export class DoParseCommand implements ICommand {
  constructor(public readonly input: ParseWalletRequest) {}
}