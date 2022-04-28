import { IQuery } from '@nestjs/cqrs';
import { ReadWalletDetailRequest } from '@trackterra/app/wallets/wallet.types';

export class GetWalletDetailQuery implements IQuery {
  constructor(public readonly input: ReadWalletDetailRequest) {}
}
