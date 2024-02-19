import { NgModule } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { InputControlComponent } from './input-control/input-control.component';
import { ButtonControlComponent } from './button-control/button-control.component';
import { RouterLink } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [InputControlComponent, ButtonControlComponent],
  imports: [
    CommonModule,
    RouterLink,
    NgClass,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [InputControlComponent, ButtonControlComponent],
})
export class SharedModule {}
