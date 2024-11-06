import { Request } from 'express';
import { UsersEntity } from '@purrch/core/postgres/entities';
import { UserDto } from '@purrch/common/dtos';


export interface RequestWithUser extends Request {
  user: UsersEntity | UserDto;
}
