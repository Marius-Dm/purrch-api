import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
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
import { EmailService } from '@purrch/core/email/email.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
    private readonly emailService: EmailService,
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

      const newUser: UsersEntity = this.usersRepository.create({
        ...registerDto,
        password: hashedPassword,
      });
      const savedUser: UsersEntity = await this.usersRepository.save(newUser);
      delete savedUser.password;

      const sendGridToken: string = await this.jwtService.signAsync(
        { email: savedUser.email },
        { secret: environment.sendgrid.secret, expiresIn: environment.sendgrid.expiresIn },
      );

      await this.emailService.sendVerificationEmail(savedUser.email, sendGridToken);

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
    const user: UsersEntity = await this.usersRepository.findOne({
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

    const accessToken: string = await this.jwtService.signAsync(payload, {
      secret: environment.jwtAccess.secret,
      expiresIn: environment.jwtAccess.expiresIn,
    });

    const refreshToken: string = await this.jwtService.signAsync(payload, {
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

  async verifyEmail(token: string): Promise<void> {
    const decoded = await this.jwtService.verifyAsync(token, { secret: environment.sendgrid.secret });
    const user: UsersEntity = await this.usersRepository.findOneBy({ email: decoded.email });

    if (!user) {
      logAndThrowError(this.logger, this.verifyEmail.name, 'User not found', NotFoundException);
    }

    user.isEmailConfirmed = true;
    await this.usersRepository.save(user);
  }
}
