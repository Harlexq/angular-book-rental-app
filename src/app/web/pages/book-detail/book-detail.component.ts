import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClientService } from 'src/app/services/http-client.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss'],
})
export class BookDetailComponent {
  bookId!: any;
  book: any;

  constructor(
    private http: HttpClientService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getDetailBook();
  }

  getDetailBook() {
    this.bookId = this.activatedRoute.snapshot.paramMap.get('id');
    this.http.getDetail('books', this.bookId, (res) => {
      this.book = res;
    });
  }
}
