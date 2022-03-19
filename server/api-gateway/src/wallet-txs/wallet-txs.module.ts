import { Module } from '@nestjs/common';
import { TimestampScalar } from '@trackterra/core';
import { TxsMutationResolver } from './wallet-txs-mutation.resolver';
import { WalletTxsController } from './wallet-txs.controller';
import { TxsResolver } from './wallet-txs.resolver';
import { WalletTxsService } from './wallet-txs.service';

@Module({
  controllers: [WalletTxsController],
  providers: [
    WalletTxsService,
    TimestampScalar,
    TxsResolver,
    TxsMutationResolver,
  ],
})
export class WalletTxsModule {}
