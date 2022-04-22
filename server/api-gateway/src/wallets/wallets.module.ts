import { Module } from '@nestjs/common';
import { TxRepository, WalletRepository } from '@trackterra/repository';
import { FCDApiService, ParserRpcClientService } from '@trackterra/core';
import { ParseWalletCommandHandlers, ParseWalletQueryHandlers } from './cqrs';
import { TTParserService } from '@trackterra/core/services/others/parser.service';
import { TTParser } from '@trackterra/parser';
import { WalletsController } from './controllers/wallets.controller';
import { WalletsResolver } from './resolvers/wallets.resolver';
import { WalletsService } from './wallets.service';

@Module({
  imports: [FCDApiService],
  providers: [
    TTParser,
    TTParserService,
    FCDApiService,
    WalletsService,
    ...ParseWalletCommandHandlers,
    ...ParseWalletQueryHandlers,
    TxRepository,
    WalletRepository,
    ParserRpcClientService,
    WalletsResolver,
  ],
  controllers: [WalletsController],
})
export class WalletsModule {}
