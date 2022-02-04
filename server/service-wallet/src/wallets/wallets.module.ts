import { Module } from '@nestjs/common';
import { TxRepository, WalletRepository } from '@trackterra/repository';
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
  ParserRpcClientService,
  TxsParsedEvent,
} from '@trackterra/core';
import { WalletsController } from './wallets.controller';
import { ParseWalletCommandHandlers, ParseWalletQueryHandlers } from './cqrs';
import { TTParserService } from '@trackterra/core/services/others/parser.service';
import { TTParser } from '@trackterra/parser';
import { TxsParsedSaga } from './sagas';

@Module({
  imports: [
    FCDApiService,
    EventStoreModule.registerFeature({
      type: 'event-store',
      featureStreamName: '$ce-wallet',
      subscriptions: [
        {
          type: EventStoreSubscriptionType.Volatile,
          stream: '$ce-wallet',
        },
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
        TxsParsedEvent: (data) => new TxsParsedEvent(data),
      },
    }),
  ],
  providers: [
    TTParser,
    TTParserService,
    FCDApiService,
    ...ParseWalletCommandHandlers,
    ...ParseWalletQueryHandlers,
    TxRepository,
    WalletRepository,
    ParserRpcClientService,
    TxsParsedSaga,
  ],
  controllers: [WalletsController],
})
export class WalletsModule {}
