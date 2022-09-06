export interface Config {
  app: AppConfig;
  database: DatabaseConfig;
  fcd_luna: FcdConfig;
  fcd_lunc: FcdConfig;
}

export interface AppConfig {
  port: number;
}

export interface FcdConfig {
  url: string;
}

export interface DatabaseConfig {
  mongodb: MongodbConfig;
  redis: RedisConfig;
}

export interface MongodbConfig {
  uri: string;
  name: string;
  options: string;
}

export interface RedisConfig {
  host: string;
  port: string;
  password: string;
}
