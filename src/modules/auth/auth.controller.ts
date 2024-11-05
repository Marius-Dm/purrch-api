import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto, RegisterDto, TokensDto } from '@purrch/common/dtos';
import { JwtRefreshGuard } from '@purrch/core/guards';
import { LoggedUser } from '@purrch/common/decorators';
import { UsersEntity } from '@purrch/core/postgres/entities';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @ApiResponse({
    status: 201,
    description: 'User successfully registered',
    type: TokensDto,
  })
  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<TokensDto> {
    return this.authService.register(registerDto);
  }

  @ApiResponse({
    status: 200,
    description: 'User successfully logged in',
    type: TokensDto,
  })
  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<TokensDto> {
    return this.authService.login(loginDto);
  }

  @ApiResponse({
    status: 200,
    description: 'Tokens successfully refreshed',
  })
  @ApiBearerAuth()
  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  async refresh(@LoggedUser() user: UsersEntity): Promise<TokensDto> {
    return this.authService.getJWTTokens(user.id, user.email);
  }

}
