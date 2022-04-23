import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import * as getPort from 'get-port';
import { NestCloud } from '@nestcloud/core';
import { SERVICE_NAME } from './constants';
import { AppModule } from './app.module';
import {
  AppUtils,
  bloodTearsMiddleware,
  corsOptions,
  setupSwagger,
} from '@trackterra/common';
import { SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = NestCloud.create(await NestFactory.create(AppModule));

  app.enableCors(corsOptions);
  app.use(bloodTearsMiddleware);
  AppUtils.killAppWithGrace(app);

  const document = SwaggerModule.createDocument(app, setupSwagger());
  SwaggerModule.setup('docs', app, document);

  const port = await getPort();
  await app.listen(NestCloud.global.boot.get('service.port', port));
  Logger.log(`${SERVICE_NAME} running on: ${await app.getUrl()}`, 'Bootstrap');
}

(async () => await bootstrap())();
