import { Component } from '@angular/core';
import { Books } from 'src/app/models/Books';
import { HttpClientService } from 'src/app/services/http-client.service';

@Component({
  selector: 'app-rent-books',
  templateUrl: './rent-books.component.html',
  styleUrls: ['./rent-books.component.scss'],
})
export class RentBooksComponent {
  books: Books[] = [];

  constructor(private http: HttpClientService) {}

  ngOnInit() {
    this.getBooks();
  }

  getBooks() {
    this.http.get<Books[]>('books', (res) => {
      this.books = res;
    });
  }
}
