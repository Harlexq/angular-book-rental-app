import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}

  checkIsAuth() {
    if (localStorage.getItem('adminUserToken')) return true;

    this.router.navigateByUrl('/admin/login');
    return false;
  }
}
