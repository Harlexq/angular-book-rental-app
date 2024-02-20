import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditCategoryComponent } from './edit-category.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [EditCategoryComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: EditCategoryComponent,
      },
    ]),
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ConfirmDialogModule,
    ToastModule,
  ],
})
export class EditCategoryModule {}
