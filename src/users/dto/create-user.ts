import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class CreateUserDto {
    @ApiProperty({ description: 'Enter your email' })
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @ApiProperty({ description: 'Enter your user name' })
    userName: string;

    @IsNotEmpty()
    @ApiProperty({ description: 'Create your password' })
    @MinLength(8)
    password: string;

}