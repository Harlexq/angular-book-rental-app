import { Component } from '@angular/core';
import { AdminFooterNavItems } from 'src/app/models/AdminFooterNavItems';

@Component({
  selector: 'admin-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  navItems: AdminFooterNavItems[] = [
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
