import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class BookDto{
    @IsNotEmpty()
    @ApiProperty({description: 'Title book'})
    @IsString()
    title: string;

    @IsNotEmpty()
    @ApiProperty({description: 'Name of author'})
    @IsString()
    author: string;

    @IsNotEmpty()
    @ApiProperty({description: 'Edit a selected book'})
    @IsString()
    publisher: string;

    @IsOptional()
    @ApiProperty({description: 'Description of book'})
    @IsString()
    description?: string;

    @IsOptional()
    @ApiProperty({description: 'Date of published book'})
    @IsInt()
    publishedYear?: number;
}