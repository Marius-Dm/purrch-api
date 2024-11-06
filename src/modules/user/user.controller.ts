import { Body, Controller, Delete, Get, Patch, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoggedUser, SetThrowError } from '@purrch/common/decorators';
import { UsersEntity } from '@purrch/core/postgres/entities';
import { UpdateUserDto, UserDto } from '@purrch/common/dtos';
import { UserService } from './user.service';
import { JwtAuthGuard } from '@purrch/core/guards';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {
  }


  @ApiOperation({ summary: 'Get logged user profile' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved logged user profile',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMe(@LoggedUser() user: UsersEntity): Promise<UserDto> {
    return this.userService.findOneUser(user.id);
  }

  @ApiOperation({ summary: 'Update logged user profile' })
  @ApiResponse({
    status: 200,
    description: 'User successfully updated',
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Patch('me')
  async updateUser(
    @LoggedUser() user: UsersEntity,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserDto> {
    return this.userService.updateUser(user.id, updateUserDto);
  }

  @ApiOperation({ summary: 'Get user by userId' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved user profile',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @SetThrowError(false)
  @Get(':userId')
  async getUser(@LoggedUser() user: UsersEntity): Promise<UserDto> {
    return this.userService.findOneUser(user.id);
  }

  @ApiOperation({ summary: 'Soft delete user profile' })
  @ApiResponse({
    status: 200,
    description: 'User successfully deleted',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete('me')
  async deleteUser(@LoggedUser() user: UsersEntity): Promise<void> {
    return this.userService.deleteUser(user.id);
  }
}
