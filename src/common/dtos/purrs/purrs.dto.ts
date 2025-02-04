import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';
import { PurrHashtagsDto } from '@purrch/common/dtos';
import { PurrsImageEntity } from '@purrch/core/postgres/entities';

@Exclude()
export class PurrsDto {
  @ApiProperty({
    type: String,
    description: 'Unique identifier of the purr',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  @IsNotEmpty()
  @Expose()
  id!: string;

  @ApiProperty({
    type: Date,
    description: 'Date when the purr was created',
    example: '2021-01-01T00:00:00.000Z',
  })
  @IsDateString()
  @IsNotEmpty()
  @Expose()
  createdAt!: Date;

  @ApiProperty({
    type: Date,
    description: 'Date when the purr was last updated',
    example: '2021-01-01T00:00:00.000Z',
  })
  @IsDateString()
  @IsNotEmpty()
  @Expose()
  updatedAt!: Date;

  @ApiProperty({
    type: Date,
    description: 'Date when the purr was deleted',
    example: '2021-01-01T00:00:00.000Z',
  })
  @IsDateString()
  @IsOptional()
  @Expose()
  deletedAt?: Date;

  @ApiProperty({
    type: String,
    description: 'Unique identifier of the user who created the purr',
    example: '123e4567-e89b-12d3-a456-426614174001',
  })
  @IsUUID()
  @IsNotEmpty()
  @Expose()
  userId!: string;

  @ApiPropertyOptional({
    type: String,
    description: 'Unique identifier of the original purr',
    example: '123e4567-e89b-12d3-a456-426614174002',
  })
  @IsUUID()
  @IsOptional()
  @Expose()
  originalPurrId?: string;

  @ApiPropertyOptional({
    type: String,
    description: 'Content of the purr',
    example: 'Hello, world!',
  })
  @IsOptional()
  @IsString()
  @Expose()
  content?: string;

  @ApiPropertyOptional({
    type: [PurrsImageEntity],
    description: 'Images attached to the purr',
  })
  @IsOptional()
  @Expose()
  images?: PurrsImageEntity[];

  @ApiPropertyOptional({
    type: [PurrHashtagsDto],
    description: 'Hashtags used in the purr',
  })
  @IsOptional()
  @Expose()
  purrHashtags?: PurrHashtagsDto[];

}