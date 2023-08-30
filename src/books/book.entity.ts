import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'src/users/user.entity';

@Entity({ name: 'book'})
export class Book {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    author: string;

    @Column({
        type:'datetime',
        default: () => 'CURRENT_TIMESTAMP'
    })
    arrivalDate: Date

    @ManyToOne(() => User, user => user.booksReserved, {nullable: true})
    reservedByUser: User
}