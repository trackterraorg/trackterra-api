import { ICommand } from '@nestjs/cqrs';
import { ParseWalletRequest } from '@trackterra/proto-schema/wallet';

export class ParseWalletCommand implements ICommand {
  constructor(public readonly input: ParseWalletRequest) {}
}
