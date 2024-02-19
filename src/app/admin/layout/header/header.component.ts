import { Component } from '@angular/core';
import { AdminNavItems } from 'src/app/models/AdminNavItems';

@Component({
  selector: 'admin-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  navItems: AdminNavItems[] = [
    {
      id: 1,
      title: 'Anasayfa',
      path: '/admin',
    },
    {
      id: 2,
      title: 'Kitaplar',
      path: '/admin/books',
    },
    {
      id: 3,
      title: 'Kategoriler',
      path: '/admin/categories',
    },
    {
      id: 4,
      title: 'Kullanıcılar',
      path: '/admin/users',
    },
  ];
}
