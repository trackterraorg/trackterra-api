import { ICommand } from '@nestjs/cqrs';
import { TxRepository } from '@trackterra/repository';
import { DeleteTxRequest } from '@trackterra/proto-schema/wallet';

export class DeleteTxCommand implements ICommand {
  constructor(
    public readonly input: DeleteTxRequest,
    public readonly txRepository: TxRepository,
  ) {}
}
