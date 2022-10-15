import { ICommand } from '@nestjs/cqrs';
import { UpdateWalletRequest } from '@trackterra/app/wallets/wallet.types';

export class UpdateWalletCommand implements ICommand {
  constructor(
    public readonly input: UpdateWalletRequest,
    public readonly ip?: string,
    public readonly reparsedAt?: Date,
  ) {}
}
