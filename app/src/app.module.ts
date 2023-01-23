import { Module } from '@nestjs/common';
import { CookieSerializer } from '@trackterra/common';
import { ServiceRegistryModule } from '@trackterra/core';
import { AppService } from './app.service';
import { CurrenciesModule } from './currencies/currencies.module';
import { WalletsModule } from './wallets/wallets.module';
import { ParserModule } from './parser/parser.module';
import { ApiModule } from './api/api.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    ServiceRegistryModule,
    ApiModule,
    WalletsModule,
    ParserModule,
    CurrenciesModule,
  ],
  controllers: [AppController],
  providers: [AppService, CookieSerializer],
})
export class AppModule {}
