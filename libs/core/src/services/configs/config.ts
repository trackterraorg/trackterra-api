import { Config } from '@trackterra/common/interfaces/config.interface';

export default (): Config => ({
  app: {
    port: process.env.APP_PORT as unknown as number,
  },
  database: {
    mongodb: {
      uri: process.env.MONGO_URI,
      name: process.env.MONGO_DB_NAME,
      options: '',
    },
    redis: {
      host: process.env.REDIS_HOST ?? 'localhost',
      port: process.env.REDIS_PORT ?? '6379',
      password: process.env.REDIS_PASS ?? '',
    },
  },
  fcd_luna: {
    url: process.env.FCD_LUNA,
  },
  fcd_lunc: {
    url: process.env.FCD_LUNC,
  },
});
