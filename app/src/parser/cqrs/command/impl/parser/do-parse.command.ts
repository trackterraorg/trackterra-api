import { ICommand } from '@nestjs/cqrs';
import { ParseWalletRequest } from '@trackterra/app/parser/parser.types';

export class DoParseCommand implements ICommand {
  constructor(public readonly input: ParseWalletRequest) {}
}
