import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from '@purrch/core/postgres/entities';

@Module({
  imports:[TypeOrmModule.forFeature([UsersEntity])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
