import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'book'})
export class Book {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @ApiProperty({description: 'Enter book name'})
    name: string;

    @Column()
    @ApiProperty({description: 'Enter author of the book'})
    author: string;

    @ApiProperty({description: 'Enter the year in which the book was published'})
    @Column({
        type:'datetime',
        default: () => 'CURRENT_TIMESTAMP'
    })
    arrivalDate: Date

    @Column({ default: false })
    isReserved: boolean;
}