import { GetTxHandler } from './get-tx.handler';
import { GetTxsHandler } from './get-txs.handler';
import { PickUnparsedTxsHandler } from './pick-unparsed-txs.handler';

export const TxQueryHandlers = [
  GetTxHandler,
  GetTxsHandler,
  PickUnparsedTxsHandler,
];
