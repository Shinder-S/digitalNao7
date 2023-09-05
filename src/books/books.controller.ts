import { Controller, Get, Post, Body, Param, Delete, Patch, UseGuards } from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from './book.entity';
import { ApiBearerAuth, ApiResponse, ApiInternalServerErrorResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@ApiBearerAuth()
@ApiTags('books')
@Controller('books')
export class BooksController {
    constructor(private readonly booksService:BooksService) {}

    //Get all books
    @UseGuards(AuthGuard)
    @Get()
    @ApiResponse({ status: 201, description: 'This is our books available' })
    findAll(): Promise<Book[]>{
        return this.booksService.findAll();
    }

    //Get one book
    @UseGuards(AuthGuard)
    @Get(':id')
    @ApiResponse({ status: 201, description: 'Here is requested book available' })
    async findOne(@Param('id') id: number): Promise<Book>{
        const book =  await this.booksService.findOne(id);
        if(!book) {
            throw new Error('The book with ID "${id}" not found');
        } else{
            return book;
        }
    }

    //Create book
    @UseGuards(AuthGuard)
    @Post()
    @ApiResponse({ status:201, description : 'create a new book' })
    @ApiInternalServerErrorResponse()
    async create(@Body() book: Book): Promise<Book> {
        return await this.booksService.create(book);
    }

    //Update a book
    @UseGuards(AuthGuard) 
    @Patch(':id')
    @ApiResponse({ status:201, description : 'update a book' })
    async update(@Param('id') id: number, @Body() book:Book): Promise<Book>{
        return this.booksService.update(id, book);
    }

    //Delete book
    @UseGuards(AuthGuard)
    @Delete(':id')
    @ApiResponse({ status:201, description : 'Delete book' })
    async delete(@Param('id') id: number): Promise<void> {
        const book = await  this.booksService.findOne(id);
        if(!book){
            throw new Error('Book not found');
        }
        return this.booksService.delete(id);
    }

    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Reserve book' })
    @ApiResponse({ status: 200, description: 'Reserve created.'})  
    @Patch(':id/reserve')
    async reserveBook(@Param('id') id: number): Promise<Book | undefined> {
      return this.booksService.reserveBook(id);
  }
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Cancel Reservation' })
    @ApiResponse({ status: 200, description: 'Cancel Reservation.'}) 
    @Patch(':id/cancel-reservation')
    async cancelReservation(@Param('id') id: number): Promise<Book | undefined> {
      return this.booksService.cancelReservation(id);
  }
}
