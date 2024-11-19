import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsString } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class FollowerDto {
  @ApiProperty({
    type: String,
    description: 'Unique identifier of the follower or followee user',
    example: '123e4567-e89b-12d3-a456-426614174001',
  })
  @IsUUID()
  @Expose()
  id!: string;

  @ApiProperty({
    type: String,
    description: 'Username of the follower or followee user',
    example: 'janedoe',
  })
  @IsString()
  @Expose()
  username!: string;
}