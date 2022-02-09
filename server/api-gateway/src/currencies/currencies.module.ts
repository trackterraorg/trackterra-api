import { Module } from '@nestjs/common';
import { CurrenciesController } from './currencies.controller';
import { CurrenciesResolver } from './currencies.resolver';

@Module({
  controllers: [CurrenciesController],
  providers: [
    CurrenciesResolver
  ],
})
export class CurrenciesModule {}
