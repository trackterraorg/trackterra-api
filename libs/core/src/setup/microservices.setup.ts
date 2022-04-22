import { INestApplication, Logger } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import { NestCloud } from '@nestcloud/core';
import { join } from 'path';
import { AppUtils } from '@trackterra/common';

interface MicroserviceSetupOptions {
  hostname?: string;
}

export async function microserviceSetup(
  app: INestApplication,
  protoPath: string,
  options?: MicroserviceSetupOptions,
) {
  const { hostname = '0.0.0.0' } = options;

  AppUtils.killAppWithGrace(app);
  app.connectMicroservice({
    transport: Transport.GRPC,
    options: {
      url: `${hostname}:${NestCloud.global.boot.get('service.port')}`,
      package: NestCloud.global.boot.get('service.name'),
      protoPath: join(process.cwd(), `/dist/libs/proto-schema/${protoPath}`),
    },
  });

  await app.startAllMicroservicesAsync();
  Logger.log(
    `GRPC ${NestCloud.global.boot.get(
      'service.name',
    )} running on port: ${NestCloud.global.boot.get('service.port')}`,
    'Bootstrap',
  );

  await app.listen(null);
  Logger.log(
    `REST ${NestCloud.global.boot.get(
      'service.name',
    )} running on: ${await app.getUrl()}`,
    'Bootstrap',
  );
}
