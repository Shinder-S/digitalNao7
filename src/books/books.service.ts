import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';

@Injectable()
export class BooksService {
    constructor(
        @InjectRepository(Book)
        private booksRepository: Repository<Book>,
    ) {}

    async findAll(): Promise<Book[]> {
        return await this.booksRepository.find();
    }

    async findOne (id: number): Promise<Book> {
        return  await this.booksRepository.findOne({where : { id } });
    }

    //Create a new book
    async create(book: Book): Promise<Book> {
        const newBook = this.booksRepository.create(book);
        return await this.booksRepository.save(newBook);
    }

    //Update a book
    async update(id: number, book: Book): Promise<Book> {
        await this.booksRepository.update(id, book);
        return await this.booksRepository.findOneOrFail({where : { id } });
    }

    //Delete a book
    async delete(id: number): Promise<void> {
        await this.booksRepository.delete(id);
    }

    async reserveBook(id: number): Promise<Book | undefined> {
        const book = await this.findOne(id);
        if (book.isReserved) {
          throw new ConflictException('Book is already reserved');
        }
        book.isReserved = true;
        return this.booksRepository.save(book);
      }
      
      async cancelReservation(id: number): Promise<Book | undefined> {
        const book = await this.findOne(id);
        if (!book.isReserved) {
          throw new ConflictException('Book is not reserved');
        }
        book.isReserved = false;
        return this.booksRepository.save(book);
      }
}