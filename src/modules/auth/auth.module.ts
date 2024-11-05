import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from '@purrch/core/postgres/entities';
import { JwtRefreshStrategy } from '@purrch/core/strategies';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity]),
    JwtModule.register({}),
    ThrottlerModule.forRoot(),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtRefreshStrategy],
  exports: [AuthService],
})
export class AuthModule {
}
