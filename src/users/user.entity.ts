import { IsEmail, IsNotEmpty } from "class-validator";
import { Role } from "src/common/enum/rol.enum";
import { Entity, Column, PrimaryGeneratedColumn, DeleteDateColumn } from "typeorm";

@Entity({ name: 'user' })
export class User {
    @PrimaryGeneratedColumn()
    id: number
    
    @Column({ unique: true })
    @IsEmail()
    @IsNotEmpty()
    email: string

    @Column()
    name: string

    @Column()
    password: string
   
    @Column({
        type: 'datetime',
        default: () => 'CURRENT_TIMESTAMP'
    })
    createdAt: Date

    @Column({ type: 'enum', default: Role.USER, enum: Role })
    role: Role;
  
    @DeleteDateColumn()
    deletedAt: Date;
}