import { Injectable } from '@nestjs/common';
import { MongoModuleOptions, MongoOptionsFactory } from '@juicycleff/repo-orm';
import { ConfigService } from '@nestjs/config';
import { DatabaseConfig } from '@trackterra/common/interfaces/config.interface';

const jestMongoDb = global.__MONGO_URI__
  ? `${global.__MONGO_URI__}/${global.__MONGO_DB_NAME__}`
  : undefined;

@Injectable()
export class MongoConfigService implements MongoOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createMongoOptions(): Promise<MongoModuleOptions> | MongoModuleOptions {
    const database = this.configService.get<DatabaseConfig>('database');
    return {
      uri: jestMongoDb || `${database?.mongodb?.uri}${database?.mongodb?.name}`,
      dbName: global.__MONGO_DB_NAME__ || database?.mongodb?.name,
      clientOptions: {
        connectTimeoutMS: 60000,
      },
    };
  }
}
