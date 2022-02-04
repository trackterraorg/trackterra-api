import { IEvent } from '@nestjs/cqrs';
import { TxEntity } from '@trackterra/repository';

export class TxDeletedEvent implements IEvent {
  constructor(public readonly tx: TxEntity) {}
}
