import { ICommand } from '@nestjs/cqrs';
import { WalletRequest } from '@trackterra/app/parser/parser.types';

export class DoParseCommand implements ICommand {
  constructor(public readonly input: WalletRequest) {}
}
