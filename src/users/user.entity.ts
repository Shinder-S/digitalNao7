import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";
import { Role } from "src/common/enum/rol.enum";
import { Entity, Column, PrimaryGeneratedColumn, DeleteDateColumn } from "typeorm";

@Entity({ name: 'user' })
export class User {
    @PrimaryGeneratedColumn()
    id: number
    
    @Column({ unique: true })
    @IsEmail()
    @ApiProperty({description: 'Enter email of user'})
    @IsNotEmpty()
    email: string

    @Column()
    @ApiProperty({description: 'Enter full name of user'})
    @IsNotEmpty()
    name: string

    @Column()
    @ApiProperty({description: 'Enter a password (8 digits at least)'})
    @IsNotEmpty()
    password: string
   
    @Column({
        type: 'datetime',
        default: () => 'CURRENT_TIMESTAMP'
    })
    createdAt: Date

    @ApiProperty({description: 'enter your role, USER or ADMIN'})
    @Column({ type: 'enum', default: Role.USER, enum: Role })
    role: Role;
  
    @DeleteDateColumn()
    deletedAt: Date;
}