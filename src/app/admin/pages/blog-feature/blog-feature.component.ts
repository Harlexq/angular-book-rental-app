import { Component, Input } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ConfirmationService, MessageService } from 'primeng/api';
import { HttpClientService } from 'src/app/services/http-client.service';
import { BlogsComponent } from '../blogs/blogs.component';
import { Blogs } from 'src/app/models/Blogs';

@Component({
  selector: 'app-blog-feature',
  templateUrl: './blog-feature.component.html',
  styleUrls: ['./blog-feature.component.scss'],
})
export class BlogFeatureComponent {
  @Input() selectedBlogId: number | null;
  form!: FormGroup;
  editorDescription: string = '';

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '250px',
    translate: 'yes',
    enableToolbar: true,
    placeholder: 'Blog Açıklamasını Giriniz',
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
    private blogsComponent: BlogsComponent
  ) {}

  ngOnChanges() {
    this.addBlogForm();
    if (this.selectedBlogId !== null && this.selectedBlogId !== undefined) {
      this.getDetailBlog();
    }
  }

  getDetailBlog() {
    if (this.selectedBlogId !== undefined) {
      this.http.getDetail<Blogs>('blogs', this.selectedBlogId, (res) => {
        this.form.patchValue({
          title: res.title,
          description: res.description,
          imageUrl: res.imageUrl,
          publicationDate: res.publicationDate,
        });
      });
    }
  }

  addBlogForm() {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      imageUrl: ['', Validators.required],
      publicationDate: ['', Validators.required],
    });
  }

  addBlog(id?: number) {
    if (id !== undefined) {
      this.confirmationService.confirm({
        message: 'Bu Bloğu Güncellemek İstediğinize Emin Misiniz?',
        header: 'Blog Güncelleme',
        icon: 'pi pi-info-circle',
        acceptButtonStyleClass: 'p-button-danger p-button-text',
        acceptLabel: 'Evet',
        rejectLabel: 'Hayır',
        rejectButtonStyleClass: 'p-button-text p-button-text',

        accept: () => {
          this.messageService.add({
            severity: 'info',
            summary: 'Güncellendi',
            detail: 'Blog Güncelleme İşlemi Başarılı',
          });

          this.http.put<Blogs>('blogs', id, this.form.value, () => {
            this.router.navigateByUrl('/admin/blogs');
            this.blogsComponent.sidebarVisible = false;
            window.location.reload();
          });
        },
        reject: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'İptal Edildi',
            detail: 'Blog Güncelleme İşlemi İptal Edildi',
          });
        },
      });
    } else {
      this.confirmationService.confirm({
        message: 'Bir Blog Eklemek İstediğinize Emin Misiniz?',
        header: 'Blog Ekleme',
        icon: 'pi pi-info-circle',
        acceptButtonStyleClass: 'p-button-danger p-button-text',
        acceptLabel: 'Evet',
        rejectLabel: 'Hayır',
        rejectButtonStyleClass: 'p-button-text p-button-text',

        accept: () => {
          this.messageService.add({
            severity: 'info',
            summary: 'Eklendi',
            detail: 'Blog Ekleme İşlemi Başarılı',
          });

          this.http.post<Blogs>('blogs', this.form.value, (res) => {
            this.router.navigateByUrl('/admin/blogs');
            this.blogsComponent.sidebarVisible = false;
            window.location.reload();
          });
          this.blogsComponent.sidebarVisible = false;
        },
        reject: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'İptal Edildi',
            detail: 'Blog Ekleme İşlemi İptal Edildi',
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
    return this.form.get('publicationDate') as FormControl;
  }
}
