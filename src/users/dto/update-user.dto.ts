import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsNotEmpty()
    @ApiProperty({description: 'Enter your email'})
    email: string;

    @IsNotEmpty()
    @ApiProperty({description: 'Enter your full name'})
    name: string;

    @IsNotEmpty()
    @ApiProperty({description: 'Enter a password (8 digits at least)'})
    password: string;
}