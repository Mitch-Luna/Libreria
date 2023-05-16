import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BooksController } from './book.controller';
import { BookImage } from './entities/Book-image.entity';

@Module({
  controllers: [BooksController, BookImage],
  providers: [BookService]
})
export class BooksModule {}
