import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import {
  AppUtils,
  bloodTearsMiddleware,
  corsOptions,
  setupSwagger,
} from '@trackterra/common';
import { SwaggerModule } from '@nestjs/swagger';
import { AppConfig } from '@trackterra/common/interfaces/config.interface';
import { ConfigService } from '@nestjs/config';
import { AppService } from './app.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(corsOptions);
  app.use(bloodTearsMiddleware);
  AppUtils.killAppWithGrace(app);

  const appService = app.get(AppService);
  appService.checkWalletsDirectory();

  const configService = app.get(ConfigService);
  const appConfig = configService.get<AppConfig>('app');

  const document = SwaggerModule.createDocument(app, setupSwagger());
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT || appConfig.port || 3000, '0.0.0.0');
  Logger.log(`Application is running on: ${await app.getUrl()}`);
}

(async () => await bootstrap())();
