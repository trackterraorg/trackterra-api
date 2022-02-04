import { ICommand } from '@nestjs/cqrs';
import { CreateTxsRequest } from '@trackterra/proto-schema/wallet';

export class CreateTxsCommand implements ICommand {
  constructor(public readonly input: CreateTxsRequest) {}
}
