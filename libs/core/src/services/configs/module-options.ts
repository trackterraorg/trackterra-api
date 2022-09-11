import { ConfigModuleOptions } from '@nestjs/config/dist/interfaces';
import * as Joi from 'joi';
import config from './config';

export const configModuleOptions: ConfigModuleOptions = {
  isGlobal: true,
  envFilePath: '.env',
  load: [config],
  validationSchema: Joi.object({
    APP_ENV: Joi.string()
      .valid('development', 'production', 'test')
      .default('development'),
    APP_PORT: Joi.number().required(),
    MONGO_URI: Joi.string().required(),
    MONGO_DB_NAME: Joi.string().required(),
    REDIS_HOST: Joi.string().required(),
    REDIS_PORT: Joi.string().required(),
    REDIS_PASS: Joi.string().required().allow(null, ''),
    FCD_LUNA: Joi.string().required().allow(null, ''),
    LCD_LUNA: Joi.string().required().allow(null, ''),
    FCD_LUNC: Joi.string().required().allow(null, ''),
    LCD_LUNC: Joi.string().required().allow(null, ''),
  }),
};
