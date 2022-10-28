import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({ description: 'Title for post required', example: 'hello' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'description for post required',
    example: 'this is hello post',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'user id required',
    example: '6012fdb7-75f1-454e-981f-9113c5e15cce',
  })
  @IsNotEmpty()
  @IsUUID()
  userId: string;
}
