import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { CookieSerializer } from '@trackterra/common';
import { CoreModule, ServiceRegistryModule } from '@trackterra/core';
import { AppService } from './app.service';
import { GqlConfigService } from './gql-config.service';
import { GlobalClientModule } from './common/global-client.module';
import { SeedModule } from './seed.module';
import { WalletsModule } from './wallets/wallets.module';
import { WalletTxsModule } from './wallet-txs/wallet-txs.module';
import { ParserModule } from './parser/parser.module';
import { CurrenciesModule } from './currencies/currencies.module';

@Module({
  imports: [
    SeedModule,
    ServiceRegistryModule,
    GraphQLModule.forRootAsync({
      useClass: GqlConfigService,
    }),
    GlobalClientModule,
    CoreModule,
    WalletsModule,
    WalletTxsModule,
    ParserModule,
    CurrenciesModule,
  ],
  providers: [AppService, CookieSerializer],
})
export class AppModule {}
