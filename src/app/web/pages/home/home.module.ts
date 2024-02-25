import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { SharedModule } from 'src/app/shared/shared.module';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { CategoriesComponent } from './categories/categories.component';
import { CarouselComponent } from './carousel/carousel.component';
import { GalleriaModule } from 'primeng/galleria';
import { TabViewModule } from 'primeng/tabview';
import { TabComponent } from './tab/tab.component';

@NgModule({
  declarations: [
    HomeComponent,
    CategoriesComponent,
    CarouselComponent,
    TabComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: HomeComponent }]),
    CardModule,
    SharedModule,
    ConfirmDialogModule,
    ToastModule,
    GalleriaModule,
    TabViewModule,
  ],
})
export class HomeModule {}
