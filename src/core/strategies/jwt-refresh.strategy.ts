import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, ForbiddenException, Logger } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../../modules/auth/auth.service';
import { logAndThrowError } from '@purrch/common/utils';


@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  private readonly logger = new Logger(JwtRefreshStrategy.name);

  constructor(
    configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('jwtRefresh.secret'),
      passReqToCallback: true,
    });
  }

  private extractTokenFromRequest(req: Request): string | null {
    const token = req.get('authorization')?.replace('Bearer', '').trim();
    return token || null;
  }

  async validate(req: Request) {
    const refreshToken = this.extractTokenFromRequest(req);
    if (!refreshToken) {
      logAndThrowError(this.logger, this.validate.name, 'Refresh token malformed', ForbiddenException);
    }

    const user = await this.authService.getUserFromRefreshToken(refreshToken);
    if (!user) {
      logAndThrowError(this.logger, this.validate.name, 'User not found', UnauthorizedException);
    }

    delete user.password;
    return user;
  }
}