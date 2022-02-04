import { Module } from '@nestjs/common';
import { ParseStatusScalar } from '@trackterra/core/scalers/parse-status.scalar';
import { WalletsMutationResolver } from './wallets-mutation.resolver';
import { WalletsController } from './wallets.controller';
import { WalletsResolver } from './wallets.resolver';

@Module({
  controllers: [WalletsController],
  providers: [WalletsResolver, WalletsMutationResolver, ParseStatusScalar],
})
export class WalletsModule {}
