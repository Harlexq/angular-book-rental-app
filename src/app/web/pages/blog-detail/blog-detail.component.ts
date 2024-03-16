import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Blogs } from 'src/app/models/Blogs';
import { HttpClientService } from 'src/app/services/http-client.service';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss'],
})
export class BlogDetailComponent {
  bookId: string = '';
  blog: Blogs;

  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClientService
  ) {}

  ngOnInit() {
    this.getDetailBook();
  }

  getDetailBook() {
    this.bookId = this.activatedRoute.snapshot.paramMap.get('id');
    this.http.getDetail<Blogs>('blogs', Number(this.bookId), (res) => {
      this.blog = res;
    });
  }
}
