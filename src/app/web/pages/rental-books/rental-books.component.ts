import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Books } from 'src/app/models/Books';
import { WebUsers } from 'src/app/models/WebUsers';
import { HttpClientService } from 'src/app/services/http-client.service';

@Component({
  selector: 'app-rental-books',
  templateUrl: './rental-books.component.html',
  styleUrls: ['./rental-books.component.scss'],
})
export class RentalBooksComponent {
  currentUser: WebUsers;
  user: WebUsers;
  rentedBooks: Books[] = [];

  constructor(
    private http: HttpClientService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    const token = localStorage.getItem('webUserToken');
    if (token) {
      this.http.get<WebUsers[]>('webUsers', (res) => {
        this.currentUser = res.find((user) => user.token === token);
        if (this.currentUser) {
          this.getUserDetail();
        }
      });
    }
  }

  getUserDetail() {
    this.http.getDetail<WebUsers>('webUsers', this.currentUser.id, (res) => {
      this.user = res;
      if (this.user.rentalBooks && this.user.rentalBooks.length > 0) {
        const bookIds = this.user.rentalBooks.map((rb) => rb.bookId);
        this.getBooks(bookIds);
      }
    });
  }

  getBooks(bookIds: number[]) {
    bookIds.forEach((bookId) => {
      this.http.getDetail<Books>('books', bookId, (res) => {
        this.rentedBooks.push(res);
      });
    });
  }

  returnBook(id: number) {
    this.confirmationService.confirm({
      message: 'Bu Kitabı İade Etmek İstediğinize Emin Misiniz?',
      header: 'Kitabı Sil',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      acceptLabel: 'Evet',
      rejectLabel: 'Hayır',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      accept: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'İade Etme',
          detail: 'Kitap İade İşlemi Başarılı',
        });
        this.http.put('books', id, {}, () => {
          window.location.reload();
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'İptal Edildi',
          detail: 'Kitap İade İşlemi İptal Edildi',
        });
      },
    });
  }
}
