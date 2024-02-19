import { Component } from '@angular/core';
import { Category } from 'src/app/models/Category';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent {
  categories: Category[] = [];

  constructor(
    private http: HttpClientService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.http.get<Category[]>('categories', (res) => {
      this.categories = res;
    });
  }

  deleteCategory(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Bu Kategoriyi Silmek İstediğinize Emin Misiniz?',
      header: 'Kategori Sil',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      accept: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'Record deleted',
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'You have rejected',
        });
      },
    });
  }
}
