import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // Створюємо FormGroup, який включає FormControl для email та password.
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private toast: HotToastService
  ) { }

  ngOnInit(): void { }

  // Методи для отримання значень FormControl.
  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  // Метод, який викликається при натисканні кнопки "Submit".
  submit() {
    if (!this.loginForm.valid) {
      return; // Якщо форма не валідна, нічого не робимо.
    }

    // Отримуємо значення email та password.
    const emailValue = this.loginForm.value.email as string;
    const passwordValue = this.loginForm.value.password as string;

    if (emailValue && passwordValue) {
      // Викликаємо метод сервісу для входу користувача.
      this.authService.login(emailValue, passwordValue).pipe(
        // Тут використовується бібліотека для зручного відображення повідомлень.
        this.toast.observe({
          success: 'Logged in successfully',
          loading: 'Logging in...',
          error: 'There was an error'
        })
      ).subscribe(() => {
        // Переходимо на домашню сторінку після успішного входу.
        this.router.navigate(['/home']);
      });
    }
  }
}

