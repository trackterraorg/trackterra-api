import { NestFactory } from '@nestjs/core';
import { NestCloud } from '@nestcloud/core';
import { AppModule } from './app.module';
import { microserviceSetup } from '@trackterra/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

async function bootstrap() {
  const app = NestCloud.create(
    await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter(),
    ),
  );
  await microserviceSetup(app, 'proto/parser.proto', {
    enableNats: false,
    enableMqtt: false,
  });
}
(async () => await bootstrap())();
