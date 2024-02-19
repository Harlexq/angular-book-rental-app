import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from './layout/layout.module';
import { PagesModule } from './pages/pages.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, LayoutModule, PagesModule],
  exports: [LayoutModule],
})
export class AdminModule {}
