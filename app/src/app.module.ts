import { Module } from '@nestjs/common';
import { CookieSerializer } from '@trackterra/common';
import { ServiceRegistryModule } from '@trackterra/core';
import { AppService } from './app.service';
import { CurrenciesModule } from './currencies/currencies.module';
import { WalletsModule } from './wallets/wallets.module';
import { ParserModule } from './parser/parser.module';

@Module({
  imports: [
    ServiceRegistryModule,
    WalletsModule,
    ParserModule,
    CurrenciesModule,
  ],
  providers: [AppService, CookieSerializer],
})
export class AppModule {}
