import { Component } from '@angular/core';
import { Category } from 'src/app/models/Category';
import { HttpClientService } from 'src/app/services/http-client.service';

@Component({
  selector: 'app-filter-sidenav',
  templateUrl: './filter-sidenav.component.html',
  styleUrls: ['./filter-sidenav.component.scss'],
})
export class FilterSidenavComponent {
  categories: Category[] = [];
  selectedCategories: Category[] = [];

  constructor(private http: HttpClientService) {}

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.http.get<Category[]>(`categories`, (res) => {
      this.categories = res;
    });
  }
}
