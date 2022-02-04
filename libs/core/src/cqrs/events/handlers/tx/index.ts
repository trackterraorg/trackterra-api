import { TxCreatedHandler } from './tx-created.handler';
import { TxDeletedHandler } from './tx-deleted.handler';
import { TxUpdatedHandler } from './tx-updated.handler';

export const TxEventHandlers = [
  TxCreatedHandler,
  TxDeletedHandler,
  TxUpdatedHandler,
];
