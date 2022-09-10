export interface Config {
  app: AppConfig;
  database: DatabaseConfig;
  chains: ChainsConfig;
}

export interface AppConfig {
  port: number;
}

export interface DatabaseConfig {
  mongodb: MongodbConfig;
  redis: RedisConfig;
}

export interface ChainsConfig {
  lunc: ChainConfig;
  luna: ChainConfig;
}

export interface ChainConfig {
  fcd: string;
  lcd: string;
  endpoints: {
    fcd: EndPoint;
    lcd: EndPoint;
  };
}

export interface EndPoint {
  txInfo?: string;
  txs?: string;
  contractInfo?: string;
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
