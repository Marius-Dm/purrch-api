import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDto, RegisterDto, TokensDto } from '@purrch/common/dtos';
import { logAndThrowError } from '@purrch/common/utils';
import { UsersEntity } from '@purrch/core/postgres/entities';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { TokenPayload } from '@purrch/common/interfaces';
import { JwtService } from '@nestjs/jwt';
import { environment } from '@purrch/core/configuration';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
    private readonly jwtService: JwtService,
  ) {
  }

  async register(registerDto: RegisterDto): Promise<TokensDto> {
    const existingUser = await this.usersRepository.findOne({
      where: [{ email: registerDto.email }, { username: registerDto.username }],
    });

    if (existingUser && existingUser.email === registerDto.email) {
      logAndThrowError(
        this.logger,
        this.register.name,
        'User with such email already exists',
        BadRequestException,
      );
    }

    if (existingUser && existingUser.username === registerDto.username) {
      logAndThrowError(
        this.logger,
        this.register.name,
        'User with such username already exists',
        BadRequestException,
      );
    }

    try {
      const hashedPassword: string = await bcrypt.hash(registerDto.password, 10);

      const newUser = this.usersRepository.create({
        ...registerDto,
        password: hashedPassword,
      });
      const savedUser = await this.usersRepository.save(newUser);
      delete savedUser.password;

      return await this.getJWTTokens(savedUser.id, savedUser.email);
    } catch (error) {
      logAndThrowError(
        this.logger,
        this.register.name,
        error,
        BadRequestException,
      );
    }
  }

  async login(loginDto: LoginDto): Promise<TokensDto> {
    const user = await this.usersRepository.findOne({
      where: { email: loginDto.email },
    });

    if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
      logAndThrowError(
        this.logger,
        this.login.name,
        'Invalid credentials',
        BadRequestException,
      );
    }

    return await this.getJWTTokens(user.id, user.email);
  }

  async getJWTTokens(userId: string, email: string): Promise<TokensDto> {
    const payload: TokenPayload = {
      sub: userId,
      email,
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: environment.jwtAccess.secret,
      expiresIn: environment.jwtAccess.expiresIn,
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: environment.jwtRefresh.secret,
      expiresIn: environment.jwtRefresh.expiresIn,
    });

    return plainToInstance(TokensDto, {
      accessToken,
      refreshToken,
    });
  }

  async getUserFromRefreshToken(refreshToken: string): Promise<UsersEntity | null> {
    const payload: TokenPayload = await this.jwtService.verifyAsync(refreshToken, {
      secret: environment.jwtRefresh.secret,
    });

    return await this.usersRepository.findOneBy({ id: payload.sub });
  }
}
