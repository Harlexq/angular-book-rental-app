import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Category } from 'src/app/models/Category';
import { HttpClientService } from 'src/app/services/http-client.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss'],
})
export class EditCategoryComponent {
  form!: FormGroup;
  categoryId: any;

  constructor(
    private http: HttpClientService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.editCategoryForm();
    this.getDetailCategory();
  }

  getDetailCategory() {
    this.categoryId = this.activatedRoute.snapshot.paramMap.get('id');
    this.http.getDetail<Category>('categories', this.categoryId, (res) => {
      this.form.patchValue({
        title: res.title,
        description: res.description,
      });
    });
  }

  editCategoryForm() {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  editCategory(event: Event) {
    this.categoryId = this.activatedRoute.snapshot.paramMap.get('id');
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Bu Kategoriyi Güncellemek İstediğinize Emin Misiniz?',
      header: 'Kategori Güncelleme',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      acceptLabel: 'Evet',
      rejectLabel: 'Hayır',
      rejectButtonStyleClass: 'p-button-text p-button-text',

      accept: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Güncellendi',
          detail: 'Kategori Güncelleme İşlemi Başarılı',
        });
        this.http.put<Category>(
          'categories',
          this.categoryId,
          this.form.value,
          () => {
            this.router.navigateByUrl('/admin/categories');
          }
        );
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'İptal Edildi',
          detail: 'Kategori Güncelleme İşlemi İptal Edildi',
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
