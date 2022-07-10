import { ParseWalletHandler } from './parse-wallet.handler';
import { CreateTxsHandler } from './create-txs.handler';
import { UpdateWalletHandler } from './update-wallet.handler';
import { ReparseWalletHandler } from './reparse-wallet.handler';

export const ParseWalletCommandHandlers = [
  ReparseWalletHandler,
  ParseWalletHandler,
  CreateTxsHandler,
  UpdateWalletHandler,
];
