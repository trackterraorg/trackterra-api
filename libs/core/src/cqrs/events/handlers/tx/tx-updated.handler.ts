import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { TxUpdatedEvent } from '../../';

@EventsHandler(TxUpdatedEvent)
export class TxUpdatedHandler implements IEventHandler<TxUpdatedEvent> {
  handle(event: TxUpdatedEvent): any {
    Logger.log(event, 'TxUpdatedEvent'); // write here
  }
}
