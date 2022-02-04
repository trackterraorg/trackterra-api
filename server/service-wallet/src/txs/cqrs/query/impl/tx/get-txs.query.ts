import { IQuery } from '@nestjs/cqrs';
import { TxRepository } from '@trackterra/repository';
import { FindTxsRequest } from '@trackterra/proto-schema/wallet';

export class GetTxsQuery implements IQuery {
  constructor(
    public readonly txRepository: TxRepository,
    public readonly input?: FindTxsRequest,
  ) {}
}
