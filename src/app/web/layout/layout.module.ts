import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { WebLayoutComponent } from './layout.component';
import { RouterOutlet } from '@angular/router';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, WebLayoutComponent],
  imports: [CommonModule, RouterOutlet],
})
export class LayoutModule {}
