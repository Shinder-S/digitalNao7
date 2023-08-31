import { Controller, Get, Post, Body, Param, Delete, Patch, UseGuards } from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from './book.entity';
import { ApiBearerAuth, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@ApiBearerAuth()
@ApiTags('books')
@Controller('books')
export class BooksController {
    constructor(private readonly booksService:BooksService) {}

    //Get all books
    @UseGuards(JwtAuthGuard)
    @Get()
    @ApiResponse({ status: 201, description: 'This is our books available' })
    findAll(): Promise<Book[]>{
        return this.booksService.findAll();
    }

    //Get one book
    @UseGuards(JwtAuthGuard)
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
    @UseGuards(JwtAuthGuard)
    @Post()
    @ApiCreatedResponse({ description : 'create a new book' })
    @ApiInternalServerErrorResponse()
    async create(@Body() book: Book): Promise<Book> {
        return await this.booksService.create(book);
    }

    //Update a book 
    @Patch(':id')
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

    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Reservar libro' })
    @ApiResponse({ status: 200, description: 'Reservación creada.'})  
    @Patch(':id/reserve')
    async reserveBook(@Param('id') id: number): Promise<Book | undefined> {
      return this.booksService.reserveBook(id);
  }
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Cancelar reservación' })
    @ApiResponse({ status: 200, description: 'Reservación Cancelada.'}) 
    @Patch(':id/cancel-reservation')
    async cancelReservation(@Param('id') id: number): Promise<Book | undefined> {
      return this.booksService.cancelReservation(id);
  }
}
