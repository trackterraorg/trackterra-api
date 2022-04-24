import { CacheModule, Global, Module } from '@nestjs/common';
import { NEST_BOOT, NEST_CONSUL } from '@nestcloud/common';
import { ConfigModule } from '@nestcloud/config';
import { ConsulModule } from '@nestcloud/consul';
import { BootModule } from '@nestcloud/boot';
import { CacheStoreConfigService, MongoConfigService } from '../services';
import { CoreModule } from './core.module';
import { GraphQLModule } from '@nestjs/graphql';
import { GqlConfigService } from '@trackterra/app/gql-config.service';
import { MongoModule } from '@juicycleff/repo-orm';

@Global()
@Module({
  imports: [
    BootModule.register(__dirname, `bootstrap.yaml`),
    ConsulModule.register({ dependencies: [NEST_BOOT] }),
    ConfigModule.register({ dependencies: [NEST_BOOT, NEST_CONSUL] }),
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
  ],
  exports: [
    BootModule.register(__dirname, `bootstrap.yaml`),
    ConsulModule.register({ dependencies: [NEST_BOOT] }),
    ConfigModule.register({ dependencies: [NEST_BOOT, NEST_CONSUL] }),
    CacheModule.registerAsync({
      useClass: CacheStoreConfigService,
    }),
  ],
})
export class ServiceRegistryModule {}
