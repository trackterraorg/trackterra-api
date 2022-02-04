import { Injectable } from '@nestjs/common';
import { InjectConfig, ConsulConfig } from '@nestcloud/config';
import {
  BullModuleOptions,
  BullOptionsFactory,
} from '@nestjs/bull/dist/interfaces/bull-module-options.interface';
import { ConsulDatabaseConfig } from '@trackterra/common';
import { PARSING_QUEUE_NAME } from '../parser.constants';

@Injectable()
export class BullConfigService implements BullOptionsFactory {
  constructor(@InjectConfig() private readonly config: ConsulConfig) {}

  createBullOptions(): Promise<BullModuleOptions> | BullModuleOptions {
    const database = this.config.get<ConsulDatabaseConfig>('database');
    return {
      name: PARSING_QUEUE_NAME,
      redis: {
        host: database.redis.host,
        port: parseInt(database.redis.port, 10),
        password: database.redis.password,
      },
    };
  }
}
