import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Books } from 'src/app/models/Books';
import { WebUsers } from 'src/app/models/WebUsers';
import { HttpClientService } from 'src/app/services/http-client.service';

@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.scss'],
})
export class RentComponent {
  bookId: string = '';
  book: Books;
  users: WebUsers[] = [];
  userFind: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClientService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
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

  getUsers() {
    this.http.get<WebUsers[]>('webUsers', (res) => {
      this.users = res;
      this.userFind = res.find((u) => u.token);
    });
  }

  rent() {
    const token = localStorage.getItem('webUserToken');

    if (token) {
      this.confirmationService.confirm({
        message: 'Bu Kitabı Kiralamak İstediğinize Emin Misiniz?',
        header: 'Kitabı Kirala',
        icon: 'pi pi-info-circle',
        acceptButtonStyleClass: 'p-button-danger p-button-text',
        acceptLabel: 'Evet',
        rejectLabel: 'Hayır',
        rejectButtonStyleClass: 'p-button-text p-button-text',
        accept: () => {
          this.http.get<WebUsers[]>('webUsers', (res) => {
            const currentUser = res.find((user) => user.token === token);

            if (!currentUser) {
              console.log('Kullanıcı bulunamadı.');
              return;
            }

            if (this.book.rentInformation.rent) {
              this.messageService.add({
                severity: 'error',
                summary: 'Hata',
                detail: 'Bu kitap zaten kiralanmış.',
              });
              return;
            }

            const today = new Date();
            const formattedDate = `${today.getFullYear()}-${(
              today.getMonth() + 1
            )
              .toString()
              .padStart(2, '0')}-${today
              .getDate()
              .toString()
              .padStart(2, '0')}`;

            const rentedBook = {
              bookId: this.book.id,
              rentDate: formattedDate,
            };

            if (!currentUser.rentalBooks) {
              currentUser.rentalBooks = [];
            }

            currentUser.rentalBooks.push(rentedBook);

            this.book.rentInformation.rent = true;
            this.book.rentInformation.byWhom = currentUser.id;

            this.http.put('webUsers', currentUser.id, currentUser, () => {});
            this.http.put('books', this.book.id, this.book, () => {});

            this.messageService.add({
              severity: 'info',
              summary: 'Kiralama İşlemi Başarılı',
              detail: 'Kiralama İşlemi Başarılı Bir Şekilde Yapıldı',
            });
          });
        },
        reject: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'İptal Edildi',
            detail: 'Kitap Kiralama İşlemi İptal Edildi',
          });
        },
      });
    }
  }
}
