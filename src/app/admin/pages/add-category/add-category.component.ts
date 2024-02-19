import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/Category';
import { HttpClientService } from 'src/app/services/common/http-client.service';

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
    private router: Router
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

  addCategory() {
    this.http.post<Category>('categories', this.form.value, (res) => {
      this.router.navigateByUrl('/admin/categories');
    });
  }

  get newTitle(): FormControl {
    return this.form.get('title') as FormControl;
  }

  get newDescription(): FormControl {
    return this.form.get('description') as FormControl;
  }
}
