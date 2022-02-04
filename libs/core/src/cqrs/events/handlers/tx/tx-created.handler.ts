import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { TxCreatedEvent } from '../../';

@EventsHandler(TxCreatedEvent)
export class TxCreatedHandler implements IEventHandler<TxCreatedEvent> {
  handle(event: TxCreatedEvent): any {
    Logger.log(event, 'TxCreatedEvent'); // write here
  }
}
