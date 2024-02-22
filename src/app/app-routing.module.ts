import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './admin/layout/layout.component';
import { WebLayoutComponent } from './web/layout/layout.component';
import { AuthService } from './services/auth.service';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivateChild: [() => inject(AuthService).checkIsAuth()],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./admin/pages/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'books',
        loadChildren: () =>
          import('./admin/pages/books/books.module').then((m) => m.BooksModule),
      },
      {
        path: 'categories',
        loadChildren: () =>
          import('./admin/pages/categories/categories.module').then(
            (m) => m.CategoriesModule
          ),
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./admin/pages/users/users.module').then((m) => m.UsersModule),
      },
    ],
  },
  {
    path: 'admin/login',
    loadChildren: () =>
      import('./admin/pages/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'admin/signup',
    loadChildren: () =>
      import('./admin/pages/signup/signup.module').then((m) => m.SignupModule),
  },
  {
    path: '',
    component: WebLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./web/pages/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'books',
        loadChildren: () =>
          import('./web/pages/books/books.module').then((m) => m.BooksModule),
      },
      {
        path: 'book-detail/:id',
        loadChildren: () =>
          import('./web/pages/book-detail/book-detail.module').then(
            (m) => m.BookDetailModule
          ),
      },
      {
        path: 'login',
        loadChildren: () =>
          import('./web/pages/login/login.module').then((m) => m.LoginModule),
      },
      {
        path: 'signup',
        loadChildren: () =>
          import('./web/pages/signup/signup.module').then(
            (m) => m.SignupModule
          ),
      },
      {
        path: 'rent',
        loadChildren: () =>
          import('./web/pages/rent/rent.module').then((m) => m.RentModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
