import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({description: 'User email',})
  email: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @ApiProperty({description: 'Enter your password',})
  @MinLength(6)
  password: string;
}