import { Injectable } from '@angular/core';
import { Auth, UserInfo, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, fetchSignInMethodsForEmail } from '@angular/fire/auth';
import { Observable, from, of } from 'rxjs';
import { debounceTime, map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  currentUser$ = authState(this.auth);

  constructor(private auth: Auth) { }

  login(username: string, password: string) {
    return from(signInWithEmailAndPassword(this.auth, username, password));
  }

  signUp(email: string, password: string) {
    return from(createUserWithEmailAndPassword(this.auth, email, password));
  }

  // Асинхронний валідатор для перевірки унікальності емейлу.
  emailAsyncValidator(): (control: any) => Observable<{ [key: string]: any } | null> {
    return (control: any): Observable<{ [key: string]: any } | null> => {
      const email = control.value;

      return of(email).pipe(
        debounceTime(500),
        switchMap(email => this.checkEmailUniqueness(email))
      );
    };
  }

  private checkEmailUniqueness(email: string): Observable<{ [key: string]: any } | null> {
    return from(fetchSignInMethodsForEmail(this.auth, email)).pipe(
      map((methods) => (methods.length === 0 ? null : { emailNotUnique: true } as const))
    );
  }

  isPasswordValidAsync(password: string): Observable<boolean> {
    return of(password).pipe(
      debounceTime(500),
      switchMap(password => this.checkPasswordValidity(password))
    );
  }

  private checkPasswordValidity(password: string): Observable<boolean> {
    // Логіка перевірки пароля. 
    // В цьому прикладі я просто перевіряю, чи пароль має хоча б одну цифру.
    const hasDigit = /\d/.test(password);
    return of(hasDigit);
  }

  updateProfileData(profileData: Partial<UserInfo>): Observable<any> {
    const user = this.auth.currentUser;
    return of(user).pipe(
      switchMap(user => {
        if (!user) throw new Error('Not Authenticated');
        return updateProfile(user, profileData);
      })
    );
  }

  logout() {
    return from(this.auth.signOut());
  }
}