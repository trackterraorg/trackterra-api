import { IQuery } from '@nestjs/cqrs';
import { ReadWalletRequest } from '@trackterra/app/wallets/wallet.types';

export class GetWalletQuery implements IQuery {
  constructor(public readonly input: ReadWalletRequest) {}
}
