import { Column, PrimaryGeneratedColumn,OneToMany } from 'typeorm';
import { BookImage } from './Book-image.entity';

export class Book {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: 'text'})
    title: string;

    @Column({type: 'text'})
    author: string;

    @Column({type: 'numeric'})
    amountPage: number;

    @Column({type: 'numeric'})
    price: number;

    @Column({type: 'numeric'})
    stock: number;

    @OneToMany(() => BookImage, (BookImage) => BookImage.book, {
        cascade: true,
        eager: true,
      })
      images?: BookImage[];
    
}
