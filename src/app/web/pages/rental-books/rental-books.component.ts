import { Component } from '@angular/core';
import { WebUsers } from 'src/app/models/WebUsers';
import { HttpClientService } from 'src/app/services/http-client.service';

@Component({
  selector: 'app-rental-books',
  templateUrl: './rental-books.component.html',
  styleUrls: ['./rental-books.component.scss'],
})
export class RentalBooksComponent {
  currentUser: any;

  constructor(private http: HttpClientService) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    const token = localStorage.getItem('webUserToken');

    if (token) {
      this.http.get<WebUsers[]>('webUsers', (res) => {
        this.currentUser = res.find((user) => user.token === token);
      });
    }
  }
}
