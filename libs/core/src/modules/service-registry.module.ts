import { CacheModule, Global, Module } from '@nestjs/common';
import { NEST_BOOT, NEST_CONSUL } from '@nestcloud/common';
import { ConfigModule } from '@nestcloud/config';
import { ScheduleModule } from '@nestcloud/schedule';
import { ConsulModule } from '@nestcloud/consul';
import { BootModule } from '@nestcloud/boot';
import { ServiceModule } from '@nestcloud/service';
import { LoggerModule } from '@nestcloud/logger';
import { CacheStoreConfigService } from '../services';

@Global()
@Module({
  imports: [
    LoggerModule.register(),
    ScheduleModule.register(),
    BootModule.register(__dirname, `bootstrap.yaml`),
    ConsulModule.register({ dependencies: [NEST_BOOT] }),
    ConfigModule.register({ dependencies: [NEST_BOOT, NEST_CONSUL] }),
    ServiceModule.register({ dependencies: [NEST_BOOT, NEST_CONSUL] }),
    CacheModule.registerAsync({
      useClass: CacheStoreConfigService,
    }),
  ],
  exports: [
    LoggerModule.register(),
    ScheduleModule.register(),
    BootModule.register(__dirname, `bootstrap.yaml`),
    ConsulModule.register({ dependencies: [NEST_BOOT] }),
    ConfigModule.register({ dependencies: [NEST_BOOT, NEST_CONSUL] }),
    ServiceModule.register({ dependencies: [NEST_BOOT, NEST_CONSUL] }),
    CacheModule.registerAsync({
      useClass: CacheStoreConfigService,
    }),
  ],
})
export class ServiceRegistryModule {}
