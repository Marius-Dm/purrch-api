import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { getEnvironment, validationSchema } from '@purrch/core/configuration';
import { postgresConfig } from '@purrch/core/postgres/postgres.config';
import { RabbitmqModule } from '@purrch/core/rabbitmq/rabbitmq.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [getEnvironment, postgresConfig],
      validationSchema,
    }),
    RabbitmqModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
