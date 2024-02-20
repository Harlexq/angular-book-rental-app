import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Category } from 'src/app/models/Category';
import { HttpClientService } from 'src/app/services/http-client.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss'],
})
export class AddCategoryComponent {
  form!: FormGroup;

  constructor(
    private http: HttpClientService,
    private formBuilder: FormBuilder,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.addCategoryForm();
  }

  addCategoryForm() {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  addCategory(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Bir Kategori Eklemek İstediğinize Emin Misiniz?',
      header: 'Kategori Ekleme',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      acceptLabel: 'Evet',
      rejectLabel: 'Hayır',
      rejectButtonStyleClass: 'p-button-text p-button-text',

      accept: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Güncellendi',
          detail: 'Kategori Ekleme İşlemi Başarılı',
        });

        this.http.post<Category>('categories', this.form.value, (res) => {
          this.router.navigateByUrl('/admin/categories');
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'İptal Edildi',
          detail: 'Kategori Ekleme İşlemi İptal Edildi',
        });
      },
    });
  }

  get newTitle(): FormControl {
    return this.form.get('title') as FormControl;
  }

  get newDescription(): FormControl {
    return this.form.get('description') as FormControl;
  }
}
