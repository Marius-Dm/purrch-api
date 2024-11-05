import { Request } from 'express';
import { UsersEntity } from '@purrch/core/postgres/entities';


export interface RequestWithUser extends Request {
  user: UsersEntity;
}
