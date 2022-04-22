import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { CookieSerializer } from '@trackterra/common';
import {
  CoreModule,
  MongoConfigService,
  ServiceRegistryModule,
} from '@trackterra/core';
import { AppService } from './app.service';
import { GqlConfigService } from './gql-config.service';
import { GlobalClientModule } from './common/global-client.module';
import { SeedModule } from './seed.module';
// import { WalletTxsModule } from './wallet-txs/wallet-txs.module';
import { ParserModule } from './parser/parser.module';
import { CurrenciesModule } from './currencies/currencies.module';
import { WalletsModule } from './wallets/wallets.module';
import { MongoModule } from '@juicycleff/repo-orm';

@Module({
  imports: [
    SeedModule,
    ServiceRegistryModule,
    MongoModule.registerAsync({
      useClass: MongoConfigService,
    }),
    GraphQLModule.forRootAsync({
      useClass: GqlConfigService,
    }),
    GlobalClientModule,
    CoreModule,
    WalletsModule,
    ParserModule,
    CurrenciesModule,
  ],
  providers: [AppService, CookieSerializer],
})
export class AppModule {}
