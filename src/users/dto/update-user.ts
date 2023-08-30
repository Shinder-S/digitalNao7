import { ApiProperty } from "@nestjs/swagger";

export class UpdateuserDto {
    @ApiProperty({
        description: 'Unique User Name'
    })
    userName?: string;

    @ApiProperty({
        description:'Password'
    })
    password?: string ;
}