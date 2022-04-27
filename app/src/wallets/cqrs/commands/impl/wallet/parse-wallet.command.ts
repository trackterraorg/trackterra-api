import { ICommand } from '@nestjs/cqrs';
import { ParseWalletRequest } from '@trackterra/app/parser/parser.types';
export class ParseWalletCommand implements ICommand {
  constructor(public readonly input: ParseWalletRequest) {}
}
