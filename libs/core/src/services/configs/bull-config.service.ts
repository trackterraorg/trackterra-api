import { Injectable } from '@nestjs/common';
import {
  BullModuleOptions,
  BullOptionsFactory,
} from '@nestjs/bull/dist/interfaces/bull-module-options.interface';
import { ConfigService } from '@nestjs/config';
import { RedisOptions } from 'ioredis';

@Injectable()
export class BullConfigService implements BullOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createBullOptions(): Promise<BullModuleOptions> | BullModuleOptions {
    const database = this.configService.get<RedisOptions>('database.redis');
    return {
      name: 'parser_queue',
      limiter: {
        max: 5,
        duration: 60 * 1000,
      },
      redis: {
        ...database,
      },
    };
  }
}
