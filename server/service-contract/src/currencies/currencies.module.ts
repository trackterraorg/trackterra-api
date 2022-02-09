import { Module } from '@nestjs/common';
import { FCDApiService } from '@trackterra/core';
import { CurrencyRepository } from '@trackterra/repository';
import { CurrencyCommandHandlers, CurrencyQueryHandlers } from './cqrs';
import { CurrenciesController } from './currencies.controller';
import { CurrenciesService } from './currencies.service';

@Module({
  controllers: [CurrenciesController],
  providers: [
    CurrenciesService, 
    CurrencyRepository, 
    FCDApiService,
    ...CurrencyCommandHandlers,
    ...CurrencyQueryHandlers,
  ],
  exports: [CurrenciesService],
})
export class CurrenciesModule {}
