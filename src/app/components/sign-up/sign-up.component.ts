import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { switchMap, mergeMap } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UsersService } from 'src/app/services/users.service';

// Валідатор для порівняння полів password і confirmPassword.
export function passwordsMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    if (password && confirmPassword && password !== confirmPassword) {
      return {
        passwordsDontMatch: true,
      };
    }
    return null;
  };
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  // Створюємо FormGroup для реєстрації, який містить FormControl для name, email, password та confirmPassword.
  signUpForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
  },
    { validators: passwordsMatchValidator() } // Використовуємо валідатор для порівняння паролів.
  );

  constructor(
    private authService: AuthenticationService,
    private toast: HotToastService,
    private router: Router,
    private usersService: UsersService
  ) { }

  ngOnInit(): void { }

  // Методи для отримання значень FormControl.
  get name() {
    return this.signUpForm.get('name');
  }

  get email() {
    return this.signUpForm.get('email');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  get confirmPassword() {
    return this.signUpForm.get('confirmPassword');
  }

  // Метод, який викликається при натисканні кнопки "Submit".
  submit() {
    const { name, email, password } = this.signUpForm.value;

    if (!this.signUpForm.valid || !name || !password || !email) {
      return; // Якщо форма не валідна, нічого не робимо.
    }

    // Викликаємо метод сервісу для реєстрації нового користувача.
    this.authService
      .signUp(email, password)
      .pipe(
        mergeMap(({ user: { uid } }) =>
          this.usersService.addUser({ uid, email, displayName: name })
        )
      )
      .subscribe(
        () => {
          // Відображаємо повідомлення про успішну реєстрацію та переходимо на домашню сторінку.
          this.toast.success('Congrats! You are all signed up');
          this.router.navigate(['/home']);
        },
        (error) => {
          // Відображаємо повідомлення про помилку в разі невдачі.
          this.toast.error(`${error.message}`);
        }
      );
  }
}
