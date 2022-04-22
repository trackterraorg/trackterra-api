export interface ConsulServiceConfig {
  app: ConsulAppConfig;
  database: ConsulDatabaseConfig;
}

export interface ConsulAppConfig {
  port: number;
  grpcPort: number;
}

export interface ConsulFcdConfig {
  url: string;
}

export interface ConsulDatabaseConfig {
  mongodb: ConsulMongodbConfig;
  redis: ConsulRedisConfig;
}

export interface ConsulMongodbConfig {
  uri: string;
  name: string;
  options: string;
}

export interface ConsulRedisConfig {
  host: string;
  port: string;
  password: string;
}
