import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCategoryComponent } from './add-category.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [AddCategoryComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: AddCategoryComponent,
      },
    ]),
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    ConfirmDialogModule,
    ToastModule,
  ],
})
export class AddCategoryModule {}
