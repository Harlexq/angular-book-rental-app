import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeModule } from './home/home.module';
import { BooksModule } from './books/books.module';
import { BookDetailModule } from './book-detail/book-detail.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, HomeModule, BooksModule, BookDetailModule],
})
export class PagesModule {}
