import { INestApplication, Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { Book } from './book.entity';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const apiDescription = new DocumentBuilder()

  .setTitle('Library example')
  .setDescription('This is the new API description')
  .setVersion('1.0')
  .addTag('books')
  .build();

@Module({
  imports: [TypeOrmModule.forFeature([Book])],
  controllers: [BooksController],
  providers: [BooksService]
})
export class BooksModule {}

export const bookDocument = (app: INestApplication) =>
  SwaggerModule.createDocument(app, apiDescription, { include: [BooksModule] });