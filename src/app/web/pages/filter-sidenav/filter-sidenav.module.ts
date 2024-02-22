import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterSidenavComponent } from './filter-sidenav.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [FilterSidenavComponent],
  imports: [CommonModule, MultiSelectModule, ReactiveFormsModule, FormsModule],
  exports: [FilterSidenavComponent],
})
export class FilterSidenavModule {}
