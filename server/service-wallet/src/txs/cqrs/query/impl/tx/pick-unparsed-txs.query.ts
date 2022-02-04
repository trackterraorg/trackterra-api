import { IQuery } from '@nestjs/cqrs';
import { TxRepository } from '@trackterra/repository';
import { PickUnparsedTxsRequest } from '@trackterra/proto-schema/wallet';

export class PickUnparsedTxsQuery implements IQuery {
  constructor(
    public readonly input: PickUnparsedTxsRequest,
    public readonly txRepository: TxRepository,
  ) {}
}
