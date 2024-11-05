import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { getEnvironment, validationSchema } from '@purrch/core/configuration';
import { postgresConfig } from '@purrch/core/postgres/postgres.config';
import { RabbitmqModule } from '@purrch/core/rabbitmq/rabbitmq.module';
import { AuthModule } from './auth/auth.module';
import { PostgresModule } from '@purrch/core/postgres/postgres.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [getEnvironment, postgresConfig],
      validationSchema,
    }),
    PostgresModule,
    RabbitmqModule,
    AuthModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
