import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Book } from './book.entity';

@Entity()
export class BookImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;
  
  @ManyToOne(() => Book, (Book) => Book.images, {
    onDelete: 'CASCADE',
  })
  book: Book;
}
