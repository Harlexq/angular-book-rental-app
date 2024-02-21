import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookDetailComponent } from './book-detail.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [BookDetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: BookDetailComponent,
      },
    ]),
  ],
})
export class BookDetailModule {}
