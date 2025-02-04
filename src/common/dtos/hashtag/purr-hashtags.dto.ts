import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsUUID } from 'class-validator';

@Exclude()
export class PurrHashtagsDto {
  @ApiProperty({
    type: String,
    description: 'Unique identifier of the purr (post)',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsNotEmpty()
  @IsUUID()
  @Expose()
  purrId!: string;

  @ApiProperty({
    type: String,
    description: 'Unique identifier of the hashtag',
    example: '123e4567-e89b-12d3-a456-426614174001',
  })
  @IsNotEmpty()
  @IsUUID()
  @Expose()
  hashtagId!: string;
}