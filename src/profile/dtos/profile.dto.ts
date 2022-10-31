import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreateProfileDto {
  @ApiProperty({ description: 'Country of User', example: 'Nepal' })
  @IsString()
  country: string;

  @ApiProperty({
    description: 'Hobby of user',
    example: ['Reading History', 'Swimming'],
  })
  @IsArray()
  hobby: string[];

  // @IsOptional()
  // user: any;
}
