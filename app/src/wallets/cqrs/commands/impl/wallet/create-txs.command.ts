import { ICommand } from '@nestjs/cqrs';
import { CreateTxsRequest } from '@trackterra/app/wallets/wallet.types';

export class CreateTxsCommand implements ICommand {
  constructor(public readonly input: CreateTxsRequest) {}
}
