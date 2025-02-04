import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class HashtagDto {
  @ApiProperty({
    type: String,
    description: 'Unique identifier of the hashtag',
    example: '123e4567-e89b-12d3-a456-426614174001',
  })
  @IsNotEmpty()
  @IsUUID()
  @Expose()
  id!: string;

  @ApiProperty({
    type: String,
    description: 'Tag of the hashtag',
    example: 'purrch',
  })
  @IsNotEmpty()
  @IsString()
  @Expose()
  tag!: string;

}