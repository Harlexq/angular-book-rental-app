import { Component } from '@angular/core';
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
import { HttpClientService } from 'src/app/services/http-client.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss'],
})
export class AddBookComponent {
  form!: FormGroup;
  editorDescription: string = '';

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
    sanitize: true,
  };

  constructor(
    private http: HttpClientService,
    private formBuilder: FormBuilder,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.addBookForm();
  }

  addBookForm() {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      imageUrl: ['', Validators.required],
      publisher: ['', Validators.required],
      author: ['', Validators.required],
      category: ['', Validators.required],
      price: ['', Validators.required],
      publicationDate: ['', Validators.required],
      pageNumber: ['', Validators.required],
    });
  }

  addBook(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
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
          summary: 'Güncellendi',
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
    return this.form.get('category') as FormControl;
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
