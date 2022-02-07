import { Module } from '@nestjs/common';
import { CurrencyQueryHandlers } from 'server/service-currency/src/currencies/cqrs';
import { CurrenciesController } from './currencies.controller';
import { CurrenciesResolver } from './currencies.resolver';

@Module({
  controllers: [CurrenciesController],
  providers: [
    CurrenciesResolver
  ],
})
export class CurrenciesModule {}
