import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class BookDto{
    @IsNotEmpty()
    @ApiProperty({description: 'Titulo del libro',})
    @IsString()
    title: string;

    @IsNotEmpty()
    @ApiProperty({description: 'Nombre del autor',})
    @IsString()
    author: string;

    @IsNotEmpty()
    @ApiProperty({description: 'Editorial del libro',})
    @IsString()
    publisher: string;

    @IsOptional()
    @ApiProperty({description: 'Descripción del libro',})
    @IsString()
    description?: string;

    @IsOptional()
    @ApiProperty({description: 'Fecha de publicación del libro',})
    @IsInt()
    publishedYear?: number;
}