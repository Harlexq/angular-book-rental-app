import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardModule } from './dashboard/dashboard.module';
import { LoginModule } from './login/login.module';
import { SignupModule } from './signup/signup.module';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { BooksModule } from './books/books.module';
import { HttpClientModule } from '@angular/common/http';
import { AddCategoryModule } from './add-category/add-category.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddBookModule } from './add-book/add-book.module';
import { EditBookModule } from './edit-book/edit-book.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DashboardModule,
    LoginModule,
    SignupModule,
    UsersModule,
    CategoriesModule,
    BooksModule,
    AddCategoryModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AddBookModule,
    EditBookModule,
  ],
})
export class PagesModule {}
