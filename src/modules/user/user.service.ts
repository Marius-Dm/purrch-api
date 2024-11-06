import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from '@purrch/core/postgres/entities';
import { Repository, UpdateResult } from 'typeorm';
import { logAndThrowError } from '@purrch/common/utils';
import { UpdateUserDto, UserDto } from '@purrch/common/dtos';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UserService {
  private readonly logger: Logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
  ) {
  }

  async findOneUser(userId: string): Promise<UserDto> {
    const found: UsersEntity = await this.usersRepository.findOneBy({ id: userId });
    if (!found) {
      logAndThrowError(this.logger, this.findOneUser.name, `User with id ${userId} not found`, NotFoundException);
    }

    return plainToInstance(UserDto, found, { groups: ['public'] });
  }

  async updateUser(userId: string, updateUserDto: UpdateUserDto): Promise<UserDto> {
    try {
      const user: UsersEntity = await this.usersRepository.preload({ id: userId, ...updateUserDto });
      const updatedUser = await this.usersRepository.save(user);
      return plainToInstance(UserDto, updatedUser);
    } catch (err) {
      logAndThrowError(this.logger, this.updateUser.name, err);
    }
  }

  async deleteUser(userId: string): Promise<void> {
    const deleteResult: UpdateResult = await this.usersRepository.softDelete({ id: userId });
    if (!deleteResult.affected) {
      logAndThrowError(this.logger, this.deleteUser.name, `User with id ${userId} not found`, NotFoundException);
    }
  }
}
