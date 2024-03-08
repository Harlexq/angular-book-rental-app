import { Component } from '@angular/core';
import { WebUsers } from 'src/app/models/WebUsers';
import { HttpClientService } from 'src/app/services/http-client.service';

@Component({
  selector: 'app-user-count',
  templateUrl: './user-count.component.html',
  styleUrls: ['./user-count.component.scss'],
})
export class UserCountComponent {
  users: WebUsers[] = [];
  data: any;

  constructor(private http: HttpClientService) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.http.get<WebUsers[]>('webUsers', (res) => {
      this.users = res;
      this.chartUsers();
    });
  }

  chartUsers() {
    const userCounts = this.users.length;

    this.data = {
      labels: ['Kullanıcılar'],
      datasets: [
        {
          label: 'Kullanıcı Sayısı',
          data: [userCounts],
          backgroundColor: [
            'rgba(255, 159, 64, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
          ],
          borderColor: [
            'rgb(255, 159, 64)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
          ],
          borderWidth: 1,
        },
      ],
    };
  }
}
