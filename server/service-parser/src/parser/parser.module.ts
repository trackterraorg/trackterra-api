import { Module } from '@nestjs/common';
import {
  EventStoreSubscriptionType,
  EventStoreModule,
} from '@juicycleff/nestjs-event-store';
import {
  WalletParsedEvent,
  WalletCreatedEvent,
  WalletUpdatedEvent,
  WalletDeletedEvent,
  WalletParsingEvent,
  FCDApiService,
  WalletsRpcClientService,
  TxsParsedEvent,
} from '@trackterra/core';
import { ParserController } from './parser.controller';
import { ParserCommandHandlers } from './cqrs';
import { ParsingProcessQueue } from './queue';
import { TTParserService } from '@trackterra/core/services/others/parser.service';
import { TTParser } from '@trackterra/parser';
import { BullModule } from '@nestjs/bull';
import { BullConfigService } from './configs/bull-config.service';
import { PARSING_QUEUE_NAME } from './parser.constants';
import { CurrenciesService } from '../currencies/currencies.service';
import { CurrenciesModule } from '../currencies/currencies.module';

@Module({
  imports: [
    FCDApiService,
    EventStoreModule.registerFeature({
      type: 'event-store',
      featureStreamName: '$ce-parser',
      subscriptions: [
        {
          type: EventStoreSubscriptionType.Volatile,
          stream: '$ce-parser',
        },
      ],
      eventHandlers: {
        WalletParsedEvent: (data) => new WalletParsedEvent(data),
        WalletCreatedEvent: (data) => new WalletCreatedEvent(data),
        WalletUpdatedEvent: (data) => new WalletUpdatedEvent(data),
        WalletDeletedEvent: (data) => new WalletDeletedEvent(data),
        WalletParsingEvent: (data) => new WalletParsingEvent(data),
        TxsParsedEvent: (data) => null,
      },
    }),
    BullModule.registerQueueAsync({
      name: PARSING_QUEUE_NAME,
      useClass: BullConfigService,
    }),
    CurrenciesModule,
  ],
  providers: [
    TTParser,
    TTParserService,
    FCDApiService,
    ...ParserCommandHandlers,
    ParsingProcessQueue,
    WalletsRpcClientService,
  ],
  controllers: [ParserController],
})
export class ParserModule {}
