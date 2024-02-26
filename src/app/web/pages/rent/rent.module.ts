import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RentComponent } from './rent.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@NgModule({
  declarations: [RentComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: RentComponent,
      },
    ]),
    SharedModule,
    ToastModule,
    ConfirmDialogModule,
  ],
})
export class RentModule {}
