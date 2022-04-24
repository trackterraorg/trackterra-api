import { CacheModule, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { CookieSerializer } from '@trackterra/common';
import { ServiceRegistryModule } from '@trackterra/core';
import { AppService } from './app.service';
import { SeedModule } from './seed.module';
import { CurrenciesModule } from './currencies/currencies.module';
import { WalletsModule } from './wallets/wallets.module';
import { ParserModule } from './parser/parser.module';

@Module({
  imports: [
    SeedModule,
    ServiceRegistryModule,
    WalletsModule,
    ParserModule,
    CurrenciesModule,
  ],
  providers: [AppService, CookieSerializer],
})
export class AppModule {}
