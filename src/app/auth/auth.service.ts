import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { User, Users } from '../types/user';

const apiUrl = environment.apiUrl;

type UserResponse = User & { success: boolean; token: string };

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // tslint:disable-next-line:variable-name
  private readonly _user = new BehaviorSubject<UserResponse>(null);

  readonly user$ = this._user.asObservable();

  get user(): UserResponse {
    return this._user.getValue();
  }

  set user(val: UserResponse) {
    this._user.next(val);
  }

  constructor(private http: HttpClient, private router: Router) {
    const localUser = localStorage.getItem('user');
    this.user = localUser ? JSON.parse(localUser) : null;
  }

  login(email: string, password: string): Observable<UserResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Basic ${btoa(`${email}:${password}`)}`
      })
    };

    return this.http.post<UserResponse>(`${apiUrl}/auth/signin`, undefined, httpOptions).pipe(
      map(user => {
        localStorage.setItem('user', JSON.stringify(user));
        this.user = user;
        this.router.navigate(['/']);
        return user;
      })
    );
  }

  register(data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }): Observable<{ success: boolean }> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.post<{ success: boolean }>(`${apiUrl}/auth/signup`, data, httpOptions).pipe(
      map(res => {
        this.router.navigate(['/login'], { queryParams: { fromRegister: true } });
        return res;
      })
    );
  }

  logout(): void {
    localStorage.removeItem('user');
    this.user = null;
    this.router.navigate(['/']);
  }

  checkAuth(): void {
    const loggedIn = this.loggedIn();
    if (!loggedIn) {
      this.logout();
    }
  }

  private loggedIn() {
    const token = this.user ? this.user.token : null;

    return !!token && !this.isTokenExpired(token);
  }

  private isTokenExpired(token: string): boolean {
    try {
      const decodedToken = jwtDecode<{ exp: number }>(token);
      if (decodedToken.exp < Date.now() / 1000) {
        return true;
      }
      return false;
    } catch (err) {
      return false;
    }
  }
}
