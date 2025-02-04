import { Module } from '@nestjs/common';
import { PurrsService } from './purrs.service';
import { PurrsController } from './purrs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurrsEntity, UsersEntity } from '@purrch/core/postgres/entities';

@Module({
  imports: [TypeOrmModule.forFeature([PurrsEntity, UsersEntity])],
  providers: [PurrsService],
  controllers: [PurrsController],
})
export class PurrsModule {
}
