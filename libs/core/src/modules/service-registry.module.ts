import { CacheModule, Global, Module } from '@nestjs/common';
import { NEST_BOOT, NEST_CONSUL } from '@nestcloud/common';
import { ConfigModule } from '@nestcloud/config';
import { ConsulModule } from '@nestcloud/consul';
import { BootModule } from '@nestcloud/boot';
import { CacheStoreConfigService } from '../services';

@Global()
@Module({
  imports: [
    BootModule.register(__dirname, `bootstrap.yaml`),
    ConsulModule.register({ dependencies: [NEST_BOOT] }),
    ConfigModule.register({ dependencies: [NEST_BOOT, NEST_CONSUL] }),
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
