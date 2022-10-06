import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

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
  @IsNotEmpty()
  isAdmin: boolean;
}

export class LoginUserDto {
  @ApiProperty({
    description:"Email address of user",
    example:"example@mail.com"
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    description:"Enter user password",
    example:"123456"
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
