import { Component } from '@angular/core';
import { Books } from 'src/app/models/Books';
import { HttpClientService } from 'src/app/services/http-client.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  historys: Books[] = [];
  romans: Books[] = [];
  fantastics: Books[] = [];

  constructor(private http: HttpClientService) {}

  ngOnInit() {
    this.getHistoryBooks();
    this.getRomanBooks();
    this.getFantasticBooks();
  }

  getHistoryBooks() {
    this.http.get<Books[]>('books?category=Tarih', (res) => {
      this.historys = res;
    });
  }

  getRomanBooks() {
    this.http.get<Books[]>('books?category=Roman', (res) => {
      this.romans = res;
    });
  }

  getFantasticBooks() {
    this.http.get<Books[]>('books?category=Fantastik', (res) => {
      this.fantastics = res;
    });
  }
}
