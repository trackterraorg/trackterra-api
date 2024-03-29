import { CacheModule, Global, Module } from '@nestjs/common';
import { CacheStoreConfigService, MongoConfigService } from '../services';
import { CoreModule } from './core.module';
import { GraphQLModule } from '@nestjs/graphql';
import { GqlConfigService } from '@trackterra/app/gql-config.service';
import { MongoModule } from '@juicycleff/repo-orm';
import { configModuleOptions } from '../services/configs/module-options';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot(configModuleOptions),
    MongoModule.registerAsync({
      useClass: MongoConfigService,
    }),
    GraphQLModule.forRootAsync({
      useClass: GqlConfigService,
    }),
    CoreModule,
    CacheModule.registerAsync({
      useClass: CacheStoreConfigService,
    }),
    EventEmitterModule.forRoot(),
  ],
  exports: [
    ConfigModule,
    CacheModule.registerAsync({
      useClass: CacheStoreConfigService,
    }),
  ],
})
export class ServiceRegistryModule {}
