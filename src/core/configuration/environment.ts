import { Environment } from '@purrch/common/interfaces/environment.interface';
import * as process from 'node:process';
import * as dotenv from 'dotenv';
dotenv.config();

export const environment: Environment = {
  environment: 'development',
  http: {
    port: !process.env.PORT ? 3000 : parseInt(process.env.PORT),
  },
  postgres: {
    host: process.env['POSTGRES_HOST']!,
    port: !process.env['POSTGRES_PORT'] ? 5432 : +process.env['POSTGRES_PORT'],
    username: process.env['POSTGRES_USER']!,
    password: process.env['POSTGRES_PASSWORD']!,
    database: process.env['POSTGRES_DB']!,
    schema: process.env['POSTGRES_SCHEMA']!,
  },
  jwtAccess: {
    secret: process.env['JWT_SECRET']!,
    expiresIn: process.env['JWT_EXPIRES_IN']!,
  },
  jwtRefresh: {
    secret: process.env['JWT_REFRESH_SECRET']!,
    expiresIn: process.env['JWT_REFRESH_EXPIRES_IN']!,
  },
};
