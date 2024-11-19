import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import {
  IsUUID,
  IsNotEmpty,
  IsDateString,
  IsOptional,
  IsString,
  IsEmail,
  IsUrl,
} from 'class-validator';
import { FollowerDto } from '@purrch/common/dtos';

@Exclude()
export class UserDto {
  @ApiProperty({
    type: String,
    description: 'Unique identifier of the user',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  @IsNotEmpty()
  @Expose()
  id!: string;

  @ApiProperty({
    type: Date,
    description: 'Date when the user was created',
    example: '2021-01-01T00:00:00.000Z',
  })
  @IsDateString()
  @IsNotEmpty()
  @Expose()
  createdAt!: Date;

  @ApiProperty({
    type: Date,
    description: 'Date when the user was last updated',
    example: '2021-01-01T00:00:00.000Z',
  })
  @IsDateString()
  @IsNotEmpty()
  @Expose()
  updatedAt!: Date;

  @ApiPropertyOptional({
    type: Date,
    description: 'Date when the user was deleted',
    example: '2021-01-01T00:00:00.000Z',
    required: false,
  })
  @IsDateString()
  @IsOptional()
  @Expose()
  deletedAt?: Date;

  @ApiProperty({
    type: String,
    description: 'Username of the user',
    example: 'johndoe',
  })
  @IsString()
  @IsNotEmpty()
  @Expose()
  username!: string;

  @ApiProperty({
    type: String,
    description: 'Display name of the user',
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  @Expose()
  displayName!: string;

  @ApiProperty({
    type: Date,
    description: 'Birth date of the user',
    example: '2000-01-01',
  })
  @IsDateString()
  @IsNotEmpty()
  @Expose()
  birthDate!: Date;

  @ApiProperty({
    type: String,
    description: 'Email of the user',
    example: 'johndoe@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  @Expose()
  email!: string;

  @ApiProperty({
    type: String,
    description: 'Password of the user',
    example: 'password',
  })
  @IsString()
  @IsNotEmpty()
  @Expose({ groups: ['sensitive'] })
  password!: string;

  @ApiPropertyOptional({
    type: String,
    description: 'Biography of the user',
    example: 'Hello, I am John Doe',
    required: false,
  })
  @IsString()
  @IsOptional()
  @Expose()
  bio?: string;

  @ApiPropertyOptional({
    type: String,
    description: 'Profile image URL of the user',
    example: 'https://example.com/profile.jpg',
    required: false,
  })
  @IsUrl()
  @IsOptional()
  @Expose()
  profileImageUrl?: string;

  @ApiPropertyOptional({
    type: String,
    description: 'Cover image URL of the user',
    example: 'https://example.com/cover.jpg',
    required: false,
  })
  @IsUrl()
  @IsOptional()
  @Expose()
  coverImageUrl?: string;

  @ApiPropertyOptional({
    type: [FollowerDto],
    description: 'List of users following this user',
    required: false,
  })
  @IsOptional()
  @Type(() => FollowerDto)
  @Expose()
  followers?: FollowerDto[];

  @ApiPropertyOptional({
    type: [FollowerDto],
    description: 'List of users this user is following',
    required: false,
  })
  @IsOptional()
  @Type(() => FollowerDto)
  @Expose()
  followed?: FollowerDto[];
}
