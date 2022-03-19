import { Module } from '@nestjs/common';
import { ParseStatusScalar } from '@trackterra/core/scalers/parse-status.scalar';
import { WalletsMutationResolver } from './wallets-mutation.resolver';
import { WalletsController } from './wallets.controller';
import { WalletsResolver } from './wallets.resolver';
import { WalletsService } from './wallets.service';

@Module({
  controllers: [WalletsController],
  providers: [
    WalletsService,
    WalletsResolver,
    WalletsMutationResolver,
    ParseStatusScalar,
  ],
})
export class WalletsModule {}
