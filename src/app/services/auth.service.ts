import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}

  checkIsAuth(): boolean {
    const token: string = localStorage.getItem('adminUserToken');
    if (token) return true;

    this.router.navigateByUrl('/admin/login');
    return false;
  }
}
