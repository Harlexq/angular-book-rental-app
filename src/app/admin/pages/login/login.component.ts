import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AdminUsers } from 'src/app/models/AdminUsers';
import { HttpClientService } from 'src/app/services/http-client.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  form!: FormGroup;
  passType = 'password';
  userError = '';
  userData: AdminUsers[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClientService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm();
  }

  loginForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  passwordShow() {
    if (this.passType == 'password') {
      this.passType = 'text';
    } else if (this.passType == 'text') {
      this.passType = 'password';
    }
  }

  login() {
    this.http.get<AdminUsers[]>('adminUsers', (res) => {
      this.userData = res;
      const resFind = res.find(
        (user) =>
          user.email === this.form.value.email &&
          user.password === this.form.value.password
      );
      const token = resFind.token;
      if (resFind) {
        if (resFind.banned) {
          this.userError = 'Kullanıcı Banlandı Giriş Yapamazsınız';
        } else {
          localStorage.setItem('adminUserToken', token);
          this.router.navigateByUrl('/admin');
        }
      } else {
        this.userError = 'Kullanıcı Bulunamadı';
      }
    });
  }

  get newEmail(): FormControl {
    return this.form.get('email') as FormControl;
  }

  get newPassword(): FormControl {
    return this.form.get('password') as FormControl;
  }
}
