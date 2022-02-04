import { Module } from '@nestjs/common';
import { TxRepository, WalletRepository } from '@trackterra/repository';
import { TxQueryHandlers, TxCommandHandlers } from './cqrs';
import { TxsController } from './txs.controller';

@Module({
  imports: [],
  providers: [
    WalletRepository,
    TxRepository,
    ...TxQueryHandlers,
    ...TxCommandHandlers,
  ],
  controllers: [TxsController],
})
export class TxsModule {}
