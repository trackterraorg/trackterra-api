import { IEvent } from '@nestjs/cqrs';
import { CreateTxsRequest } from '@trackterra/proto-schema/wallet';

export class TxsParsedEvent implements IEvent {
  constructor(public readonly parsedTx: CreateTxsRequest) {}
}
