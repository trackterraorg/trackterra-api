import { Module } from '@nestjs/common';
import { CursorScaler, TimestampScalar } from '@trackterra/core';
import { TxsMutationResolver } from './wallet-txs-mutation.resolver';
import { WalletTxsController } from './wallet-txs.controller';
import { TxsResolver } from './wallet-txs.resolver';

@Module({
  controllers: [WalletTxsController],
  providers: [TimestampScalar, TxsResolver, TxsMutationResolver],
})
export class WalletTxsModule {}
