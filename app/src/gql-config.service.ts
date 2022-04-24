import { Injectable } from '@nestjs/common';
import { GqlModuleOptions, GqlOptionsFactory } from '@nestjs/graphql';
import { RedisCache } from 'apollo-server-cache-redis';
import { corsApollOptions } from '@trackterra/common';
import { buildContext } from 'graphql-passport';
import { GqlContext } from '@trackterra/core';
import { RedisOptions } from 'ioredis';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GqlConfigService implements GqlOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createGqlOptions(): Promise<GqlModuleOptions> | GqlModuleOptions {
    /* Get redis config from consul */
    const redisOptions = this.configService.get<RedisOptions>('database.redis');

    /* initialize cache */
    const cache = new RedisCache(redisOptions);
    return {
      autoSchemaFile: true,
      path: 'graphql',
      cors: corsApollOptions,
      context: ({ req, res, payload, connection }): GqlContext => {
        const bc = buildContext({ req, res });

        return {
          // @ts-ignore
          payload,
          connection,
          ...bc,
          rpc: {},
        };
      },
      cache,

      /**
       * Enable this at your own detriment. Without this, namespaced mutation won't work,
       * I have taken time to make sure resolvers guards are place in the right places.
       * While extending the application, be careful
       * Here is the reason https://github.com/nestjs/graphql/issues/295
       */
      fieldResolverEnhancers: ['guards', 'interceptors'],
      persistedQueries: {
        cache,
      },
      playground: {
        workspaceName: 'Api Gateway',
        settings: {
          // 'editor.theme': 'light',
          'request.credentials': 'same-origin',
        },
      },
    };
  }
}
