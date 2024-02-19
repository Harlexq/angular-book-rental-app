import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './admin/layout/layout.component';
import { WebLayoutComponent } from './web/layout/layout.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminLayoutComponent,
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
        path: 'add-category',
        loadChildren: () =>
          import('./admin/pages/add-category/add-category.module').then(
            (m) => m.AddCategoryModule
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
    path: 'login',
    loadChildren: () =>
      import('./admin/pages/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'signup',
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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
