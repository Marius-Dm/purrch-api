import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import * as jwt from 'jsonwebtoken';
import { RequestWithUser, TokenPayload } from '@purrch/common/interfaces';
import { logAndThrowError } from '@purrch/common/utils';
import { UsersEntity } from '@purrch/core/postgres/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class JwtAuthGuard implements CanActivate {
  private readonly logger: Logger = new Logger(JwtAuthGuard.name);

  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>,
    private readonly reflector: Reflector,
  ) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const throwError: boolean =
      this.reflector.get<boolean>('throwError', context.getHandler()) ?? true;

    const authHeader = request.headers.authorization;
    if (!authHeader) {
      if (throwError) {
        throw new UnauthorizedException();
      }
      return true;
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      if (throwError) {
        throw new UnauthorizedException('Token not found.');
      }
      return true;
    }

    let payload: TokenPayload;
    try {
      payload = jwt.verify(
        token,
        this.configService.get<string>('jwtAccess.secret'),
      ) as TokenPayload;
    } catch (err) {
      if (throwError) {
        logAndThrowError(this.logger, this.canActivate.name, err, UnauthorizedException);
      }
      return true;
    }

    const user: UsersEntity = await this.userRepository.findOneBy({ id: payload.sub });

    if (!user) {
      if (throwError) {
        logAndThrowError(this.logger, this.canActivate.name, 'User not found', UnauthorizedException);
      }
      return true;
    }

    delete user.password;
    request.user = user;
    return true;
  }
}
