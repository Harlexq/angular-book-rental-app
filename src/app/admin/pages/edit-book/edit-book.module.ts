import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditBookComponent } from './edit-book.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { AngularEditorModule } from '@kolkov/angular-editor';

@NgModule({
  declarations: [EditBookComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: EditBookComponent,
      },
    ]),
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    ToastModule,
    ConfirmDialogModule,
    AngularEditorModule,
  ],
})
export class EditBookModule {}
