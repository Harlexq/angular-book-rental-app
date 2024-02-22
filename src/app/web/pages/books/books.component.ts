import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Books } from 'src/app/models/Books';
import { HttpClientService } from 'src/app/services/http-client.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent {
  books: Books[] = [];
  pagedBooks: Books[] = [];
  rows: number = 10;
  first: number = 0;
  rowSize: number[] = [10, 20, 30];

  constructor(
    private http: HttpClientService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.getBooks();
  }

  getBooks() {
    this.http.get<Books[]>('books', (res) => {
      this.books = res;
      this.paginateBooks();
    });
  }

  paginateBooks() {
    this.pagedBooks = this.books.slice(this.first, this.first + this.rows);
  }

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    this.paginateBooks();
  }

  rent() {
    if (localStorage.getItem('webUserToken')) {
      this.router.navigateByUrl('/rent');
    } else {
      this.confirmationService.confirm({
        message:
          'Bir Kitap Kiralamak İçin Öncelikle Giriş Yapmalısınız Giriş Yapmak İstediğinize Emin Misiniz?',
        header: 'Giriş Yap',
        icon: 'pi pi-info-circle',
        acceptButtonStyleClass: 'p-button-danger p-button-text',
        acceptLabel: 'Evet',
        rejectLabel: 'Hayır',
        rejectButtonStyleClass: 'p-button-text p-button-text',
        accept: () => {
          this.messageService.add({
            severity: 'info',
            summary: 'İptal E',
            detail: 'Giriş Sayfasına Yönlendiriliyorsunuz',
          });
          this.router.navigateByUrl('/login');
        },
        reject: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'İptal Edildi',
            detail: 'Giriş Yapma İşlemi İptal Edildi',
          });
        },
      });
    }
  }
}
