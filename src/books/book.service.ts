import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { CreateBookDto } from './dto/Book.dto';
import { BookImage } from './entities/Book-image.entity';

@Injectable()
export class BookService {
    constructor(
        @InjectRepository(Book)
        private readonly BookRepository: Repository<Book>,
        @InjectRepository(BookImage)
        private readonly imageRepository: Repository<BookImage>,
        private readonly dataSource: DataSource,
      ) {}
    
      async create(BookDto: CreateBookDto) {
        const { images = [], ...detalleBook } = BookDto;
        const Book = await this.BookRepository.create({
          ...detalleBook,
          images: images.map((image) =>
            this.imageRepository.create({ url: image }),
          ),
        });
        await this.BookRepository.save(Book);
        return Book;
      }
    
      findAll() {
        return this.BookRepository.find({
          relations: ['images'],
        });
      }
    
      findOne(id: string) {
        return this.BookRepository.findOneBy({ id });
      }
    
      async remove(id: string) {
        const Book = await this.findOne(id);
        await this.BookRepository.remove(Book);
        return 'Haz eliminado el libro satisfactoriamente';
      }
    
    
      async update(id: string, cambios: CreateBookDto) {
        const { images, ...updateAll } = cambios;
        const Book = await this.BookRepository.preload({
          id: id,
          ...updateAll,
        });

        const queryRunner = await this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
  
        if (images) {
          await queryRunner.manager.delete(BookImage, { Book: { id } });
    
          Book.images = images.map((image) =>
            this.imageRepository.create({ url: image }),
          );
        } else {
          Book.images = await this.imageRepository.findBy({ book: { id } });
        }
    
        await queryRunner.manager.save(Book);
        await queryRunner.commitTransaction();
        await queryRunner.release();
        return Book;
      }
}
