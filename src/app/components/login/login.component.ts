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
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private toast: HotToastService
  ) { }

  ngOnInit(): void {

  }

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  submit() {
    if (!this.loginForm.valid) {
      return;
    }

    const emailValue = this.loginForm.value.email as string;
    const passwordValue = this.loginForm.value.password as string;

    if (emailValue && passwordValue) {
      this.authService.login(emailValue, passwordValue).pipe(
        this.toast.observe({
          success: 'Logged in successfully',
          loading: 'Logging in...',
          error: 'There was an arror'
        })
      ).subscribe(() => {
        this.router.navigate(['/home']);
      });
    }
  }
}
