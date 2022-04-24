export default (): any => ({
  env: process.env.APP_ENV,
  port: process.env.APP_PORT,
  mongo: {
    uri: process.env.MONGO_URI,
    name: process.env.MONGO_DB_NAME,
  },
  redis: {
    host: process.env.REDIS_HOST ?? 'localhost',
    port: process.env.REDIS_PORT ?? '6379',
    pass: process.env.REDIS_PORT ?? '',
  },
});
