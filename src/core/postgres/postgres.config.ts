import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as entities from '@purrch/core/postgres/entities/index';
import { environment } from '@purrch/core/configuration/environment';

const { host, port, username, password, database, schema } =
  environment.postgres;

export const postgresConfig = registerAs(
  'postgres-config',
  (): TypeOrmModuleOptions => {
    return {
      type: 'postgres',
      host,
      port,
      username,
      password,
      database,
      schema,
      entities: Object.values(entities),
      migrations: [`${__dirname}/migrations/*.{ts,js}`],
      migrationsTableName: 'data_migrations',
      migrationsRun: true,
      synchronize: false,
      logging: true,
    };
  },
);
