import { Component } from '@angular/core';
import { Category } from 'src/app/models/Category';
import { HttpClientService } from 'src/app/services/http-client.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent {
  categories: Category[] = [];

  constructor(private http: HttpClientService) {}

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.http.get<Category[]>('categories', (res) => {
      this.categories = res;
    });
  }
}
