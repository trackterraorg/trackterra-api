import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

const whitelist = [
  '/trackterra.org$/',
  'http://localhost:3000',
  'http://localhost:4000',
  'http://localhost:80',
  'http://localhost:8080',
];

export const corsOptions: CorsOptions = {
  origin: '*',
  // preflightContinue: true,
  credentials: true,
  optionsSuccessStatus: 200,
};

export const corsApollOptions: CorsOptions = {
  origin: whitelist,
  // preflightContinue: true,
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST'],
};
