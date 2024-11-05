import { OmitType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { UserDto } from '../user';

@Exclude()
export class RegisterDto extends OmitType(UserDto, [
  'id',
  'createdAt',
  'updatedAt',
  'deletedAt',
] as const) {
}
