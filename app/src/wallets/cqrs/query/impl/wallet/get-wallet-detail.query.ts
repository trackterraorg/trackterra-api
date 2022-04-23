import { IQuery } from '@nestjs/cqrs';
import { ReadWalletDetailRequest } from '@trackterra/proto-schema/wallet';
import { WalletRepository } from '@trackterra/repository';

export class GetWalletDetailQuery implements IQuery {
  constructor(public readonly input: ReadWalletDetailRequest) {}
}
