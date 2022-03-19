import { MongoModule } from '@juicycleff/repo-orm';
import { Module } from '@nestjs/common';
import {
  CoreModule,
  MongoConfigService,
  ServiceRegistryModule,
} from '@trackterra/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CurrenciesModule } from './currencies/currencies.module';

@Module({
  imports: [
    CoreModule,
    ServiceRegistryModule,
    MongoModule.registerAsync({
      useClass: MongoConfigService,
    }),
    CurrenciesModule,
  ],
  exports: [ServiceRegistryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
