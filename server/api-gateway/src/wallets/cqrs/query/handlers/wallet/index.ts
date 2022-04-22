import { GetWalletsHandler } from './get-wallets.handler';
import { CheckWalletHandler } from './get-wallet.handler';
import { GetWalletDetailHandler } from './get-wallet-detail.handler';
import { GetWalletTxsHandler } from './get-wallet-txs.handler';

export const ParseWalletQueryHandlers = [
  GetWalletsHandler,
  CheckWalletHandler,
  GetWalletDetailHandler,
  GetWalletTxsHandler,
];
