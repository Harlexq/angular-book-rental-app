import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddBookComponent } from './add-book.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [AddBookComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: AddBookComponent }]),
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    ToastModule,
    ConfirmDialogModule,
    AngularEditorModule,
    DropdownModule,
  ],
})
export class AddBookModule {}
