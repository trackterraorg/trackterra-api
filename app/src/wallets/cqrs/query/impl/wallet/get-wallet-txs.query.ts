import { IQuery } from '@nestjs/cqrs';
import { FindTxsRequest } from '@trackterra/app/wallets/wallet.types';

export class GetWalletTxsQuery implements IQuery {
  constructor(public readonly input?: FindTxsRequest) {}
}
