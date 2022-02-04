import { IEvent } from '@nestjs/cqrs';
import { WalletEntity } from '@trackterra/repository';

export class WalletDeletedEvent implements IEvent {
  constructor(public readonly wallet: WalletEntity) {}
}
