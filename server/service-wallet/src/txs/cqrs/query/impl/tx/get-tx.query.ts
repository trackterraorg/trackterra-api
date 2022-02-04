import { IQuery } from '@nestjs/cqrs';
import { TxRepository } from '@trackterra/repository';
import { ReadTxRequest } from '@trackterra/proto-schema/wallet';

export class GetTxQuery implements IQuery {
  constructor(
    public readonly input: ReadTxRequest,
    public readonly txRepository: TxRepository,
  ) {}
}
