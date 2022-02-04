import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { TxDeletedEvent } from '../../';

@EventsHandler(TxDeletedEvent)
export class TxDeletedHandler implements IEventHandler<TxDeletedEvent> {
  handle(event: TxDeletedEvent): any {
    Logger.log(event, 'TxDeletedEvent'); // write here
  }
}
