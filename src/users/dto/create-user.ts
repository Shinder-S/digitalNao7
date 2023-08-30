import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto {
    @ApiProperty({ description: 'Enter your email' })
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @ApiProperty({ description: 'Enter your user name' })
    userName: string;

    @IsNotEmpty()
    @ApiProperty({ description: 'Create your password' })
    password: string;

    @ApiProperty({ description: 'Select your role' })
    isAdmin: boolean
}