import { GetWalletsHandler } from './get-wallets.handler';
import { CheckWalletHandler } from './get-wallet.handler';
import { GetWalletDetailHandler } from './get-wallet-detail.handler';

export const ParseWalletQueryHandlers = [
  GetWalletsHandler,
  CheckWalletHandler,
  GetWalletDetailHandler,
];
