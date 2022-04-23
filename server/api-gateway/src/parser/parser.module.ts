import { Module } from '@nestjs/common';
import { FCDApiService } from '@trackterra/core';
import { ParserService } from './parser.service';
import { ParserCommandHandlers } from './cqrs';
import { TTParserService } from '@trackterra/core/services/others/parser.service';
import { TTParser } from '@trackterra/parser';
import { ParserController } from './controllers/parser.controller';
import { WalletsService } from '../wallets/wallets.service';
import { WalletRepository } from '@trackterra/repository';
import { CurrenciesService } from '../currencies/currencies.service';

@Module({
  providers: [
    TTParser,
    TTParserService,
    FCDApiService,
    ...ParserCommandHandlers,
    ParserService,
    WalletsService,
    WalletRepository,
    CurrenciesService,
  ],
  controllers: [ParserController],
})
export class ParserModule {}
