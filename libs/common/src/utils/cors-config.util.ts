import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

const whitelist = [
  '/trackterra.org$/',
  'http://localhost:3000',
  'http://localhost:4000',
  'http://localhost:80',
  'http://localhost:8080',
];

export const corsOptions: CorsOptions = {
  origin: whitelist,
  allowedHeaders: 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe',
  methods: "GET,PUT,POST,DELETE,UPDATE,OPTIONS",
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
