import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RentComponent } from './rent.component';
import { RouterModule } from '@angular/router';

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
  ],
})
export class RentModule {}
