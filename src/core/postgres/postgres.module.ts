import { Module } from '@nestjs/common';
import { postgresOptions } from './postgres-options';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRootAsync(postgresOptions)],
})
export class PostgresModule {}
