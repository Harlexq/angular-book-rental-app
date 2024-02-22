import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
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

  constructor(
    private http: HttpClientService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.getHistoryBooks();
    this.getRomanBooks();
    this.getFantasticBooks();
  }

  getHistoryBooks() {
    this.http.get<Books[]>('books?categoryId=5', (res) => {
      this.historys = res;
    });
  }

  getRomanBooks() {
    this.http.get<Books[]>('books?categoryId=1', (res) => {
      this.romans = res;
    });
  }

  getFantasticBooks() {
    this.http.get<Books[]>('books?categoryId=4', (res) => {
      this.fantastics = res;
    });
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
