import { Component, Input, SimpleChanges } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Books } from 'src/app/models/Books';
import { Category } from 'src/app/models/Category';
import { HttpClientService } from 'src/app/services/http-client.service';
import { BooksComponent } from '../books/books.component';

@Component({
  selector: 'app-book-feature',
  templateUrl: './book-feature.component.html',
  styleUrls: ['./book-feature.component.scss'],
})
export class BookFeatureComponent {
  @Input() selectedBookId: number | null;
  form!: FormGroup;
  editorDescription: string = '';
  categories: Category[] = [];

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '250px',
    translate: 'yes',
    enableToolbar: true,
    placeholder: 'Kitap Açıklamasını Giriniz',
    defaultParagraphSeparator: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' },
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText',
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    sanitize: false,
  };

  constructor(
    private http: HttpClientService,
    private formBuilder: FormBuilder,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private booksComponent: BooksComponent
  ) {}

  ngOnChanges() {
    this.addBookForm();
    this.getCategories();
    if (this.selectedBookId !== null && this.selectedBookId !== undefined) {
      this.getDetailBook();
    }
  }

  getCategories() {
    this.http.get<Category[]>('categories', (res) => {
      this.categories = res;
    });
  }

  getDetailBook() {
    if (this.selectedBookId !== undefined) {
      this.http.getDetail<Books>('books', this.selectedBookId, (res) => {
        this.form.patchValue({
          title: res.title,
          description: res.description,
          imageUrl: res.imageUrl,
          publisher: res.publisher,
          author: res.author,
          price: res.price,
          categoryId: res.categoryId,
          publicationDate: res.publicationDate,
          pageNumber: res.pageNumber,
        });
      });
    }
  }

  addBookForm() {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      imageUrl: ['', Validators.required],
      publisher: ['', Validators.required],
      author: ['', Validators.required],
      price: ['', Validators.required],
      publicationDate: ['', Validators.required],
      pageNumber: ['', Validators.required],
      categoryId: ['', Validators.required],
    });
  }

  addBook(id?: number) {
    if (id !== undefined) {
      this.confirmationService.confirm({
        message: 'Bu Kitabı Güncellemek İstediğinize Emin Misiniz?',
        header: 'Kitap Güncelleme',
        icon: 'pi pi-info-circle',
        acceptButtonStyleClass: 'p-button-danger p-button-text',
        acceptLabel: 'Evet',
        rejectLabel: 'Hayır',
        rejectButtonStyleClass: 'p-button-text p-button-text',

        accept: () => {
          this.messageService.add({
            severity: 'info',
            summary: 'Güncellendi',
            detail: 'Kitap Güncelleme İşlemi Başarılı',
          });

          const model = {
            rentInformation: {
              rent: false,
              byWhom: null,
            },
            ...this.form.value,
          };

          this.http.put<Books>('books', id, model, () => {
            this.router.navigateByUrl('/admin/books');
            this.booksComponent.sidebarVisible = false;
            window.location.reload();
          });
        },
        reject: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'İptal Edildi',
            detail: 'Kitap Güncelleme İşlemi İptal Edildi',
          });
        },
      });
    } else {
      this.confirmationService.confirm({
        message: 'Bir Kitap Eklemek İstediğinize Emin Misiniz?',
        header: 'Kitap Ekleme',
        icon: 'pi pi-info-circle',
        acceptButtonStyleClass: 'p-button-danger p-button-text',
        acceptLabel: 'Evet',
        rejectLabel: 'Hayır',
        rejectButtonStyleClass: 'p-button-text p-button-text',

        accept: () => {
          this.messageService.add({
            severity: 'info',
            summary: 'Eklendi',
            detail: 'Kitap Ekleme İşlemi Başarılı',
          });

          const model = {
            rentInformation: {
              rent: false,
              byWhom: null,
            },
            ...this.form.value,
          };

          this.http.post<Books>('books', model, (res) => {
            this.router.navigateByUrl('/admin/books');
            this.booksComponent.sidebarVisible = false;
            window.location.reload();
          });
        },
        reject: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'İptal Edildi',
            detail: 'Kitap Ekleme İşlemi İptal Edildi',
          });
        },
      });
    }
  }

  get newTitle(): FormControl {
    return this.form.get('title') as FormControl;
  }

  get newDescription(): FormControl {
    return this.form.get('description') as FormControl;
  }

  get newImageUrl(): FormControl {
    return this.form.get('imageUrl') as FormControl;
  }

  get newPublisher(): FormControl {
    return this.form.get('publisher') as FormControl;
  }

  get newAuthor(): FormControl {
    return this.form.get('author') as FormControl;
  }

  get newCategory(): FormControl {
    return this.form.get('categoryId') as FormControl;
  }

  get newPrice(): FormControl {
    return this.form.get('price') as FormControl;
  }

  get newPublicationDate(): FormControl {
    return this.form.get('publicationDate') as FormControl;
  }

  get newPageNumber(): FormControl {
    return this.form.get('pageNumber') as FormControl;
  }
}
