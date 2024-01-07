import { Injectable } from '@angular/core';
import { Auth, UserInfo, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from '@angular/fire/auth';
import { Observable, concatMap, from, of, switchMap } from 'rxjs';
import { debounceTime, map, take } from 'rxjs/operators';

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

  // Асинхронний валідатор для перевірки пароля.
  isPasswordValidAsync(password: string): Observable<boolean> {
    return of(password).pipe(
      debounceTime(500), // Затримка перед викликом сервісу.
      switchMap(password =>
        this.checkPasswordValidity(password)
      )
    );
  }

  private checkPasswordValidity(password: string): Observable<boolean> {
    // Ось ваша логіка перевірки пароля. 
    // В цьому прикладі я просто перевіряю, чи пароль має хоча б одну цифру.
    const hasDigit = /\d/.test(password);
    return of(hasDigit);
  }

  // Оновлює дані профілю користувача.
  updateProfileData(profileData: Partial<UserInfo>): Observable<any> {
    const user = this.auth.currentUser;
    return of(user).pipe(
      concatMap(user => {
        if (!user) throw new Error('Not Authenticated');
        return updateProfile(user, profileData);
      })
    );
  }

  logout() {
    return from(this.auth.signOut());
  }
}

