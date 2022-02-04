import { IEvent } from '@nestjs/cqrs';

export class WalletParsedEvent implements IEvent {
  constructor(
    public readonly input: {
      address: string;
      newHighestParsedTxBlock: number;
    },
  ) {}
}
