import { UserDto } from './user.dto';
import { OmitType, PartialType } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(
  OmitType(UserDto, ['id', 'createdAt', 'updatedAt', 'deletedAt', 'password', 'username', 'email'] as const),
) {
}