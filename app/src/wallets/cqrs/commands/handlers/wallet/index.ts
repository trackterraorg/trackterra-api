import { ParseWalletHandler } from './parse-wallet.handler';
import { CreateTxsHandler } from './create-txs.handler';
import { UpdateWalletHandler } from './update-wallet.handler';

export const ParseWalletCommandHandlers = [
  ParseWalletHandler,
  CreateTxsHandler,
  UpdateWalletHandler,
];
