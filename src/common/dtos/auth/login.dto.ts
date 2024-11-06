import { PickType } from '@nestjs/swagger';
import { UserDto } from '@purrch/common/dtos';
import { Expose } from 'class-transformer';

export class LoginDto extends PickType(UserDto, ['email', 'password'] as const) {
  @Expose()
  password!: string;
}