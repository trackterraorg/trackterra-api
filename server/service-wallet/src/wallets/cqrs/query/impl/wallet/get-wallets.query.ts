import { IQuery } from '@nestjs/cqrs';
import { FindWalletsRequest } from '@trackterra/proto-schema/wallet';
import { WalletRepository } from '@trackterra/repository';

export class GetWalletsQuery implements IQuery {
  constructor(
    public readonly walletRepository: WalletRepository,
    public readonly input?: FindWalletsRequest,
  ) {}
}
