import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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

    @Column({ default: false })
    isReserved: boolean;
}