import { parseRabbitMQExchanges } from '@purrch/common/utils';
import { Environment } from '@purrch/common/interfaces';
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
    secret: process.env['JWT_ACCESS_TOKEN_SECRET']!,
    expiresIn: process.env['JWT_ACCESS_TOKEN_EXPIRATION_TIME']!,
  },
  jwtRefresh: {
    secret: process.env['JWT_REFRESH_TOKEN_SECRET']!,
    expiresIn: process.env['JWT_REFRESH_TOKEN_EXPIRATION_TIME']!,
  },
  rabbitmq: {
    host: process.env['RABBITMQ_HOST']!,
    port: parseInt(process.env['RABBITMQ_PORT']!, 10),
    username: process.env['RABBITMQ_USERNAME']!,
    password: process.env['RABBITMQ_PASSWORD']!,
    protocol: process.env['RABBITMQ_PROTOCOL']
      ? process.env['RABBITMQ_PROTOCOL']
      : 'amqps',
    exchanges: parseRabbitMQExchanges(process.env['RABBITMQ_EXCHANGES']!),
  },
};
