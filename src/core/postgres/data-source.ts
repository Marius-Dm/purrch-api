import { DataSourceOptions, DataSource } from 'typeorm';
import { environment } from '../configuration';
import * as entities from './entities/index';

const { host, port, username, password, database } = environment.postgres;

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host,
  port,
  username,
  password,
  database,
  synchronize: false,
  entities: Object.values(entities),
  migrations: [`${__dirname}/migrations/*{.ts,.js}`],
  migrationsTableName: 'data_migrations',
  migrationsRun: true,
  logging: true,
};

export default new DataSource(dataSourceOptions);
