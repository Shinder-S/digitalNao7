import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from './book.entity';

@Controller('books')
export class BooksController {
    constructor(private readonly booksService:BooksService){}

    //Get all books
    @Get()
    async findAll(): Promise<Book[]>{
        return await this.booksService.findAll();
    }

    //Get one book
    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Book>{
        const book =  await this.booksService.findOne(id);
        if(!book) {
            throw new Error('The book with ID "${id}" not found');
        } else{
            return book;
        }
    }

    //Create book
    @Post()
    async create(@Body() book: Book): Promise<Book> {
        return await this.booksService.create(book);
    }

    //Update a book 
    @Put(':id')
    async update(@Param('id') id: number, @Body() book:Book): Promise<Book>{
        return this.booksService.update(id, book);
    }

    //Delete book
    @Delete(':id')
    async delete(@Param('id') id: number): Promise<void> {
        const book = await  this.booksService.findOne(id);
        if(!book){
            throw new Error('Book not found');
        }
        return this.booksService.delete(id);
    }
}
