import { ICommand } from '@nestjs/cqrs';
import { UpdateWalletRequest } from '@trackterra/proto-schema/wallet';

export class UpdateWalletCommand implements ICommand {
  constructor(public readonly input: UpdateWalletRequest) {}
}
