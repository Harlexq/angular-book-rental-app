import { Component } from '@angular/core';
import { WebNavItems } from 'src/app/models/WebNavItems';

@Component({
  selector: 'web-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  navItems: WebNavItems[] = [
    {
      id: 1,
      title: 'Anasayfa',
      path: '/',
    },
    {
      id: 2,
      title: 'Kitaplar',
      path: '/books',
    },
  ];
}
