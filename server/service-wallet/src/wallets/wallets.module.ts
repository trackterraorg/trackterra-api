import { Module } from '@nestjs/common';
import { TxRepository, WalletRepository } from '@trackterra/repository';
import { FCDApiService, ParserRpcClientService } from '@trackterra/core';
import { WalletsController } from './wallets.controller';
import { ParseWalletCommandHandlers, ParseWalletQueryHandlers } from './cqrs';
import { TTParserService } from '@trackterra/core/services/others/parser.service';
import { TTParser } from '@trackterra/parser';

@Module({
  imports: [FCDApiService],
  providers: [
    TTParser,
    TTParserService,
    FCDApiService,
    ...ParseWalletCommandHandlers,
    ...ParseWalletQueryHandlers,
    TxRepository,
    WalletRepository,
    ParserRpcClientService,
  ],
  controllers: [WalletsController],
})
export class WalletsModule {}
