import { Module } from '@nestjs/common';
import {
  WalletParsedEvent,
  WalletCreatedEvent,
  WalletUpdatedEvent,
  WalletDeletedEvent,
  WalletParsingEvent,
  FCDApiService,
  WalletsRpcClientService,
  ContractRpcClientService,
} from '@trackterra/core';
import { ParserController } from './parser.controller';
import { ParserCommandHandlers } from './cqrs';
import { ParsingProcessQueue } from './queue';
import { TTParserService } from '@trackterra/core/services/others/parser.service';
import { TTParser } from '@trackterra/parser';
import { BullModule } from '@nestjs/bull';
import { BullConfigService } from './configs/bull-config.service';
import { PARSING_QUEUE_NAME } from './parser.constants';

@Module({
  imports: [
    FCDApiService,
    BullModule.registerQueueAsync({
      name: PARSING_QUEUE_NAME,
      useClass: BullConfigService,
    }),
  ],
  providers: [
    TTParser,
    TTParserService,
    FCDApiService,
    ...ParserCommandHandlers,
    ParsingProcessQueue,
    WalletsRpcClientService,
    ContractRpcClientService,
  ],
  controllers: [ParserController],
})
export class ParserModule {}
