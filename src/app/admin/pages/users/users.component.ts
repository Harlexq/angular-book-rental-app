import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Books } from 'src/app/models/Books';
import { WebUsers } from 'src/app/models/WebUsers';
import { HttpClientService } from 'src/app/services/http-client.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  users: WebUsers[] = [];
  books: Books[] = [];

  constructor(
    private http: HttpClientService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.getWebUsers();
    this.getBooks();
  }

  getBooks() {
    this.http.get<Books[]>('books', (res) => {
      this.books = res;
    });
  }

  getWebUsers() {
    this.http.get<WebUsers[]>('webUsers', (res) => {
      this.users = res;
    });
  }

  getBooksName(bookId: number): string {
    const book = this.books.find((b) => b.id === bookId);
    return book ? book.title : '';
  }

  deleteUser(id: number) {
    this.confirmationService.confirm({
      message: 'Bu Kullanıcıyı Silmek İstediğinize Emin Misiniz?',
      header: 'Kullanıcı Sil',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      acceptLabel: 'Evet',
      rejectLabel: 'Hayır',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      accept: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Silindi',
          detail: 'Kullanıcı Silme İşlemi Başarılı',
        });
        this.http.delete('webUsers', id, () => {
          window.location.reload();
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'İptal Edildi',
          detail: 'Kullanıcı Silme İşlemi İptal Edildi',
        });
      },
    });
  }

  sidebarVisible: boolean = false;
  selectedUserId: number;

  toggleSidebar(id: number) {
    this.selectedUserId = id;
    this.sidebarVisible = !this.sidebarVisible;
  }
}
