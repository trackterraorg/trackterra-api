import { forwardRef, Module } from '@nestjs/common';
import { TxRepository, WalletRepository } from '@trackterra/repository';
import { ParseWalletCommandHandlers, ParseWalletQueryHandlers } from './cqrs';
import { WalletsController } from './controllers/wallets.controller';
import { WalletsResolver } from './resolvers/wallets.resolver';
import { WalletsService } from './wallets.service';
import { ParserModule } from '../parser/parser.module';
import { TxsController } from './controllers/txs.controller';
import { TxsResolver } from './resolvers/txs.resolver';

@Module({
  providers: [
    WalletsService,
    WalletRepository,
    ...ParseWalletCommandHandlers,
    ...ParseWalletQueryHandlers,
    TxRepository,
    WalletsResolver,
    TxsResolver,
  ],
  controllers: [WalletsController, TxsController],
  exports: [WalletsService, WalletRepository],
  imports: [forwardRef(() => ParserModule)],
})
export class WalletsModule {}
