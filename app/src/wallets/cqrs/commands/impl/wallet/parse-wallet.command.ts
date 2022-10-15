import { ICommand } from '@nestjs/cqrs';
import { WalletRequest } from '@trackterra/app/parser/parser.types';
export class ParseWalletCommand implements ICommand {
  constructor(
    public readonly input: WalletRequest,
    public readonly reparse: boolean,
    public readonly ip?: string,
  ) {}
}
