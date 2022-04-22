import { IQuery } from '@nestjs/cqrs';
import { ReadWalletRequest } from '@trackterra/proto-schema/wallet';

export class GetWalletQuery implements IQuery {
  constructor(public readonly input: ReadWalletRequest) {}
}
