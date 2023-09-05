import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';

describe('BooksService', () => {
  let booksService: BooksService;
  let bookRepository: Repository<Book>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: getRepositoryToken(Book),
          useClass: Repository,
        },
      ],
    }).compile();

    booksService = module.get<BooksService>(BooksService);
    bookRepository = module.get<Repository<Book>>(getRepositoryToken(Book));
  });

  it('should be defined', () => {
    expect(booksService).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of books', async () => {
      const books: Book[] = [];
      jest.spyOn(bookRepository, 'find').mockResolvedValue(books);

      const result = await booksService.findAll();

      expect(result).toEqual(books);
    });
  });

  describe('findOne', () => {
    it('should return a book by id', async () => {
      const bookId = 1;
      const book: Book = {
        id: 1,
        name: '',
        author: '',
        arrivalDate: undefined,
        isReserved: false
      };
      jest.spyOn(bookRepository, 'findOne').mockResolvedValue(book);

      const result = await booksService.findOne(bookId);

      expect(result).toEqual(book);
    });
  });
});
