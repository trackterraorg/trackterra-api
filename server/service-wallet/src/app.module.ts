import { Module } from '@nestjs/common';
import { CoreModule, ServiceRegistryModule } from '@trackterra/core/modules';
import { MongoModule } from '@juicycleff/repo-orm/database';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WalletsModule } from './wallets/wallets.module';
import { MongoConfigService } from '@trackterra/core';
import { TxsModule } from './txs/txs.module';

@Module({
  imports: [
    ServiceRegistryModule,
    CoreModule,
    /**
     * NOTICE: Scoped Request is not yet supported by CQRS hence commands
     * and query will fail. Working to fix it in NestJS
     * Using registerAsync will disable dependency injection in CQRS.
     */
    MongoModule.registerAsync({
      useClass: MongoConfigService,
    }),
    WalletsModule,
    TxsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
