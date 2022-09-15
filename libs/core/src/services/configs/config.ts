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
  chains: {
    luna: {
      fcd: process.env.FCD_LUNA,
      lcd: process.env.LCD_LUNA,
      endpoints: {
        fcd: {
          txInfo: '/v1/tx/',
          txs: '/v1/txs/',
        },
        lcd: {
          queryContract: '/cosmwasm/wasm/v1/contract/{address}/smart/{query}',
        },
      },
    },
    lunc: {
      fcd: process.env.FCD_LUNC,
      lcd: process.env.LCD_LUNC,
      endpoints: {
        fcd: {
          txInfo: '/v1/tx/',
          txs: '/v1/txs/',
        },
        lcd: {
          queryContract:
            '/terra/wasm/v1beta1/contracts/{address}/store?query_msg={query}',
        },
      },
    },
  },
});
