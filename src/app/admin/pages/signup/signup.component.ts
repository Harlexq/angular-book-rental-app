import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Users } from 'src/app/models/Users';
import { HttpClientService } from 'src/app/services/http-client.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  form!: FormGroup;
  passType = 'password';

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClientService,
    private router: Router
  ) {}

  ngOnInit() {
    this.signupForm();
  }

  signupForm() {
    this.form = this.formBuilder.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(12),
          ],
        ],
        rePassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(control: FormGroup): ValidationErrors | null {
    const password = control.get('password');
    const rePassword = control.get('rePassword');

    return password && rePassword && password.value === rePassword.value
      ? null
      : { passwordMismatch: true };
  }

  passwordShow() {
    if (this.passType == 'password') {
      this.passType = 'text';
    } else if (this.passType == 'text') {
      this.passType = 'password';
    }
  }

  signup() {
    const { rePassword, ...formValue } = this.form.value;

    const model = {
      ...formValue,
      banned: false,
    };
    this.http.post<Users>('users', model, (res) => {
      this.router.navigateByUrl('/login');
    });
  }

  get newFirstName(): FormControl {
    return this.form.get('firstName') as FormControl;
  }

  get newLastName(): FormControl {
    return this.form.get('lastName') as FormControl;
  }

  get newEmail(): FormControl {
    return this.form.get('email') as FormControl;
  }

  get newPassword(): FormControl {
    return this.form.get('password') as FormControl;
  }

  get newRePassword(): FormControl {
    return this.form.get('rePassword') as FormControl;
  }
}
