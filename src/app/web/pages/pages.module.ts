import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localeTr from '@angular/common/locales/tr';
import { BookDetailModule } from './book-detail/book-detail.module';
import { BooksModule } from './books/books.module';
import { FilterSidenavModule } from './filter-sidenav/filter-sidenav.module';
import { HomeModule } from './home/home.module';
import { LoginModule } from './login/login.module';
import { RentModule } from './rent/rent.module';
import { SignupModule } from './signup/signup.module';

registerLocaleData(localeTr, 'tr');

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BookDetailModule,
    BooksModule,
    FilterSidenavModule,
    HomeModule,
    LoginModule,
    RentModule,
    SignupModule,
  ],
})
export class PagesModule {}
