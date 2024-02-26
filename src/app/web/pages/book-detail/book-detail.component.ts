import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Books } from 'src/app/models/Books';
import { HttpClientService } from 'src/app/services/http-client.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss'],
})
export class BookDetailComponent {
  bookId: string = '';
  book: Books;

  constructor(
    private http: HttpClientService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getDetailBook();
  }

  getDetailBook() {
    this.bookId = this.activatedRoute.snapshot.paramMap.get('id');
    this.http.getDetail<Books>('books', Number(this.bookId), (res) => {
      this.book = res;
    });
  }
}
