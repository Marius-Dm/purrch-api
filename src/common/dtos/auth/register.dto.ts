import { OmitType } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { UserDto } from '../user';

@Exclude()
export class RegisterDto extends OmitType(UserDto, [
  'id',
  'createdAt',
  'updatedAt',
  'deletedAt',
  'followed',
  'followers',
] as const) {
  @Expose()
  password!: string;
}
