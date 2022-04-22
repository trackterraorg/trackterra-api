import { Module } from '@nestjs/common';
import { FCDApiService } from '@trackterra/core';
import { CurrencyRepository } from '@trackterra/repository';
import { CurrencyCommandHandlers, CurrencyQueryHandlers } from './cqrs';
import { CurrenciesSeeder } from './currencies.seeder';
import { CurrenciesService } from 'server/service-contract/src/currencies/currencies.service';
import { CurrenciesController } from './controllers/currencies.controller';

@Module({
  controllers: [CurrenciesController],
  providers: [
    CurrenciesService,
    CurrencyRepository,
    FCDApiService,
    ...CurrencyCommandHandlers,
    ...CurrencyQueryHandlers,
    CurrenciesSeeder,
  ],
  exports: [CurrenciesService],
})
export class CurrenciesModule {}
