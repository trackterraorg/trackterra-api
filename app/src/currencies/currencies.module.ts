import { Module } from '@nestjs/common';
import { CurrencyRepository } from '@trackterra/repository';
import { CurrencyCommandHandlers, CurrencyQueryHandlers } from './cqrs';
import { CurrenciesSeeder } from './currencies.seeder';
import { CurrenciesService } from './currencies.service';
import { CurrenciesController } from './controllers/currencies.controller';
import { ApiModule } from '../api/api.module';

@Module({
  controllers: [CurrenciesController],
  providers: [
    CurrenciesService,
    CurrencyRepository,
    ...CurrencyCommandHandlers,
    ...CurrencyQueryHandlers,
    CurrenciesSeeder,
  ],
  imports: [ApiModule],
  exports: [CurrenciesService],
})
export class CurrenciesModule {}
