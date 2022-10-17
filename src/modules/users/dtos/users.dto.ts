import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Name of User',
    example: 'example',
  })
  @IsNotEmpty()
  @IsString()
  userName: string;

  @ApiProperty({
    description: 'The email address of User',
    example: 'example@mail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Set password',
    example: '123456',
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({
    description: 'Admin',
    example: false,
  })
  @IsOptional()
  isAdmin: boolean;
}

export class LoginUserDto {
  @ApiProperty({
    description: 'Email address of user',
    example: 'example@mail.com',
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Enter user password',
    example: '123456',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class UpdateUserDto {
  @ApiProperty({
    description: 'update name of user(Optional)',
    example: 'example1',
  })
  @IsOptional()
  @IsString()
  userName: string;

  @ApiProperty({
    description: 'Update Email address of user',
    example: 'example1@mail.com',
  })
  @IsOptional()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Update password of user',
    example: '121212',
  })
  @IsOptional()
  @IsString()
  password: string;

  @IsOptional()
  @IsBoolean()
  isAdmin: boolean;
}
