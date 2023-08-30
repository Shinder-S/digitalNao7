import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('books library')
    .setDescription('Save a new book, see the complete list and reserve one of our books')
    .setVersion('1.0')
    .addServer('http://localhost:3000/api/v1')
    .addTag('books')
    .addTag('users')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  app.setGlobalPrefix('api/v1');
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
