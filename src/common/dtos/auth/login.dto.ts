import { PickType } from '@nestjs/swagger';
import { UserDto } from '@purrch/common/dtos';

export class LoginDto extends PickType(UserDto, ['email', 'password'] as const) {}