import { HttpConfiguration } from './configuration/http-configuration';
import { PostgresConfiguration } from './configuration/postgres-configuration';
import { JwtConfiguration } from './configuration/jwt-configuration';
import { EnvironmentConfiguration } from './configuration/env-configuration';

export interface Environment {
  environment: EnvironmentConfiguration;
  http: HttpConfiguration;
  postgres: PostgresConfiguration;
  jwtAccess: JwtConfiguration;
  jwtRefresh: JwtConfiguration;
}
