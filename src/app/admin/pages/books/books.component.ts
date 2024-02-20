import { Component } from '@angular/core';
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

  constructor(
    private http: HttpClientService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.getBooks();
  }

  getBooks() {
    this.http.get<Books[]>('books', (res) => {
      this.books = res;
    });
  }

  deleteBook(event: Event, id: number) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Bu Kitabı Silmek İstediğinize Emin Misiniz?',
      header: 'Kitabı Sil',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      acceptLabel: 'Evet',
      rejectLabel: 'Hayır',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      accept: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Silindi',
          detail: 'Kitap Silme İşlemi Başarılı',
        });
        this.http.delete('books', id, () => {
          window.location.reload();
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'İptal Edildi',
          detail: 'Kitap Silme İşlemi İptal Edildi',
        });
      },
    });
  }
}
