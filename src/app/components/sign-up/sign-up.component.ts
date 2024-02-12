import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { switchMap, mergeMap } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UsersService } from 'src/app/services/users.service';

import { passwordsMatchValidator } from './password-helper'

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signUpForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
  },
    { validators: passwordsMatchValidator() }
  );

  constructor(private authService: AuthenticationService, private toast: HotToastService, private router: Router, private usersService: UsersService) { }

  ngOnInit(): void {

  }

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

  submit() {
    const { name, email, password } = this.signUpForm.value;

    if (!this.signUpForm.valid || !name || !password || !email) {
      return;
    }

    this.authService
      .signUp(email, password)
      .pipe(
        mergeMap(({ user: { uid } }) =>
          this.usersService.addUser({ uid, email, displayName: name })
        )
      )
      .subscribe(
        () => {
          this.toast.success('Congrats! You are all signed up');
          this.router.navigate(['/home']);
        },
        (error) => {
          this.toast.error(`${error.message}`);
        }
      );
  }
}