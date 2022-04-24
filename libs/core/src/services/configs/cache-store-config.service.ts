import {
  CacheModuleOptions,
  CacheOptionsFactory,
  Injectable,
} from '@nestjs/common';
import { Etcd3 } from 'etcd3';
import redisStore from 'cache-manager-redis-store';
import { RedisOptions } from 'ioredis';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CacheStoreConfigService implements CacheOptionsFactory {
  ty: Etcd3;
  constructor(private readonly configService: ConfigService) {}

  createCacheOptions(): Promise<CacheModuleOptions> | CacheModuleOptions {
    const database = this.configService.get<RedisOptions>('database.redis');
    const caching =
      this.configService.get<{ ttl: number; max: number }>('app.caching');

    if (database?.password === '') {
      delete database.password;
    }

    return {
      store: redisStore,
      ttl: caching?.ttl, // seconds
      max: caching?.max, // maximum number of items in cache
      options: {
        ...database,
      },
    };
  }
}
