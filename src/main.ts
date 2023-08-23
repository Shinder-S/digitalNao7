import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { bookDocument } from './books/books.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  SwaggerModule.setup('/docs', app, bookDocument(app));
  await app.listen(3000);
}
bootstrap();
