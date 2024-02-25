import { Component } from '@angular/core';
import { WebNavItems } from 'src/app/models/WebNavItems';
import { WebUsers } from 'src/app/models/WebUsers';
import { HttpClientService } from 'src/app/services/http-client.service';

@Component({
  selector: 'web-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  loggedInUsername: string | null = null;

  constructor(private http: HttpClientService) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.http.get<WebUsers[]>('webUsers', (res) => {
      const token = localStorage.getItem('webUserToken');

      if (token) {
        const loggedInUser = res.find((user) => user.token === token);
        if (loggedInUser) {
          this.loggedInUsername = `${loggedInUser.firstName} ${loggedInUser.lastName}`;
        }
      }
    });
  }

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
    {
      id: 3,
      title: 'Bloglar',
      path: '/blogs',
    },
    {
      id: 4,
      title: 'İletişim',
      path: '/contact',
    },
  ];
}
