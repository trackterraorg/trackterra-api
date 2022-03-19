import { MongoModule } from '@juicycleff/repo-orm';
import { Module } from '@nestjs/common';
import {
  CoreModule,
  MongoConfigService,
  ServiceRegistryModule,
} from '@trackterra/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ParserModule } from './parser/parser.module';

@Module({
  imports: [ServiceRegistryModule, CoreModule, CoreModule, ParserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
