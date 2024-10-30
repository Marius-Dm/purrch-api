import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { getEnvironment, validationSchema } from '@purrch/core/configuration';
import { postgresConfig } from '@purrch/core/postgres/postgres.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [getEnvironment, postgresConfig],
      validationSchema,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
