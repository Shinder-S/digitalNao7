import { IsBoolean, IsEmail, IsNotEmpty } from "class-validator";
import { Book } from "src/books/book.entity";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";

@Entity({ name: 'user' })
export class User {
    @PrimaryGeneratedColumn()
    id: number
    
    @Column({ unique: true })
    @IsEmail()
    @IsNotEmpty()
    email: string

    @Column()
    userName: string

    @Column()
    password: string
   
    @Column({
        type: 'datetime',
        default: () => 'CURRENT_TIMESTAMP'
    })
    createdAt: Date

    @Column({ default: false })
    @IsBoolean()
    isAdmin: boolean;
}