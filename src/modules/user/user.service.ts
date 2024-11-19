import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FollowersEntity, UsersEntity } from '@purrch/core/postgres/entities';
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
    @InjectRepository(FollowersEntity)
    private readonly followersRepository: Repository<FollowersEntity>,
  ) {
  }

  async findOneUser(userId: string): Promise<UserDto> {
    const found: UsersEntity = await this.usersRepository.findOne({
      where: { id: userId },
      relations: [
        'followers',
        'followers.follower',
        'followed',
        'followed.followed',
      ],
    });

    if (!found) {
      logAndThrowError(
        this.logger,
        this.findOneUser.name,
        `User with id ${userId} not found`,
        NotFoundException,
      );
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

  async followUser(loggedUserId: string, followedId: string): Promise<void> {
    await this.usersRepository.findOneByOrFail({ id: followedId }).catch(() => {
      logAndThrowError(this.logger, this.followUser.name, `User with id ${followedId} not found`, NotFoundException);
    });

    const follow: FollowersEntity = await this.followersRepository.findOneBy({ followerId: loggedUserId, followedId });

    if (follow) {
      await this.followersRepository.delete({ followerId: loggedUserId, followedId });
    } else {
      const newFollow: FollowersEntity = this.followersRepository.create({ followerId: loggedUserId, followedId });
      await this.followersRepository.save(newFollow);
    }
  }
}
