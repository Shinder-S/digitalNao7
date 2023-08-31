import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, IsString, MinLength } from 'class-validator';

export class LoginAuthDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  userName: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({description: 'User email',})
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({description: 'Enter your password',})
  @MinLength(6)
  password: string;
}