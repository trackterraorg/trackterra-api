import { Module } from '@nestjs/common';
import { FCDApiService, ContractRpcClientService } from '@trackterra/core';
import { ParserService } from './parser.service';
import { ParserCommandHandlers } from './cqrs';
import { TTParserService } from '@trackterra/core/services/others/parser.service';
import { TTParser } from '@trackterra/parser';
import { ParserController } from './controllers/parser.controller';
import { WalletsService } from '../wallets/wallets.service';
import { WalletRepository } from '@trackterra/repository';

@Module({
  imports: [FCDApiService],
  providers: [
    TTParser,
    TTParserService,
    FCDApiService,
    ...ParserCommandHandlers,
    ContractRpcClientService,
    ParserService,
    WalletsService,
    WalletRepository,
  ],
  controllers: [ParserController],
})
export class ParserModule {}
