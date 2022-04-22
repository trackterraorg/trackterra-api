import { IQuery } from '@nestjs/cqrs';
import { FindTxsRequest } from '@trackterra/proto-schema/wallet';

export class GetWalletTxsQuery implements IQuery {
  constructor(public readonly input?: FindTxsRequest) {}
}
