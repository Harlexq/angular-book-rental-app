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
  ],
})
export class PagesModule {}
