import { NgModule } from '@angular/core';
import { CommonModule, DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';
import { BooksComponent } from './books.component';
import { RouterModule } from '@angular/router';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [BooksComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: BooksComponent,
      },
    ]),
    SharedModule,
    ConfirmDialogModule,
    ToastModule,
  ],
  providers: [
    {
      provide: DATE_PIPE_DEFAULT_OPTIONS,
      useValue: { dateFormat: 'longDate' },
    },
  ],
})
export class BooksModule {}
