import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule } from '@angular/router';
import { ChartModule } from 'primeng/chart';
import { RentBooksComponent } from './rent-books/rent-books.component';

@NgModule({
  declarations: [DashboardComponent, RentBooksComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: DashboardComponent,
      },
    ]),
    ChartModule,
  ],
})
export class DashboardModule {}
