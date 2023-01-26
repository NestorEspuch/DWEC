import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, ReplaySubject } from 'rxjs';
import { User, UserLogin } from 'src/app/users/interfaces/user';
import { TokenResponse } from '../interfaces/responses';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly AUTH_URL = 'auth';

  constructor(private readonly http: HttpClient, private router: Router) {}

  logged = false;
  loginChange$ = new ReplaySubject<boolean>();

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  login(userLogin: UserLogin): Observable<void> {
    const result = this.http.post<void>(this.AUTH_URL + '/login', userLogin);
    result.subscribe((t) => {
      this.saveToken((t as unknown as TokenResponse).accessToken);
      this.logged = true;
      this.loginChange$.next(true);
    });

    return result;
  }

  register(userInfo: User): Observable<void> {
    return this.http.post<void>(this.AUTH_URL + '/register', userInfo);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.loginChange$.next(false);
    this.router.navigate(['/auth/login']);
    this.logged = false;
  }

  isLogged(): Observable<boolean> {
    if (!this.logged && !localStorage.getItem('token')) {
      return of(false);
    } else if (!this.logged && localStorage.getItem('token')) {
      if (this.validateToken()) {
        this.logged = true;
        this.loginChange$.next(true);
        return of(true);
      } else {
        localStorage.removeItem('token');
        return of(false);
      }
    } else {
      return of(true);
    }
  }

  loginGoogle(userLogin: UserLogin): Observable<void> {
    const login = this.http.post<void>('auth/google', userLogin);

    login.subscribe((token) => {
      this.loginChange$.next(true);
      this.saveToken((token as unknown as TokenResponse).accessToken);
    });

    return login;
  }

  loginFaceebok(userLogin: UserLogin): Observable<void> {
    const login = this.http.post<void>('/auth/facebook', userLogin);

    login.subscribe((token) => {
      this.loginChange$.next(true);
      this.saveToken((token as unknown as TokenResponse).accessToken);
    });

    return login;
  }

  validateToken(): Observable<TokenResponse> {
    return this.http.get<TokenResponse>(this.AUTH_URL + '/validate');
  }
}
