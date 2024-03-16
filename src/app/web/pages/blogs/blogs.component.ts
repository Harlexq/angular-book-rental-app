import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Blogs } from 'src/app/models/Blogs';
import { HttpClientService } from 'src/app/services/http-client.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss'],
})
export class BlogsComponent {
  blogs: Blogs[] = [];
  pagedBlogs: Blogs[] = [];
  rows: number = 8;
  first: number = 0;
  rowSize: number[] = [8, 16, 24];

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
    this.http.get<Blogs[]>('blogs', (res) => {
      this.blogs = res;
      this.paginateBlogs();
    });
  }

  paginateBlogs() {
    this.pagedBlogs = this.blogs.slice(this.first, this.first + this.rows);
  }

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    this.paginateBlogs();
  }

  rent(bookId: number) {
    if (localStorage.getItem('webUserToken')) {
      this.confirmationService.confirm({
        message: 'Bu Bloğu Kiralamak İstediğinize Emin Misiniz?',
        header: 'Bloğu Kirala',
        icon: 'pi pi-info-circle',
        acceptButtonStyleClass: 'p-button-danger p-button-text',
        acceptLabel: 'Evet',
        rejectLabel: 'Hayır',
        rejectButtonStyleClass: 'p-button-text p-button-text',
        accept: () => {
          this.messageService.add({
            severity: 'info',
            summary: 'Kiralama Yönlendirme',
            detail: 'Giriş Sayfasına Yönlendiriliyorsunuz',
          });
          this.router.navigateByUrl(`/book-detail/${bookId}`);
        },
        reject: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'İptal Edildi',
            detail: 'Blog Kiralama İşlemi İptal Edildi',
          });
        },
      });
    } else {
      this.confirmationService.confirm({
        message:
          'Bir Blog Kiralamak İçin Öncelikle Giriş Yapmalısınız Giriş Yapmak İstediğinize Emin Misiniz?',
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
