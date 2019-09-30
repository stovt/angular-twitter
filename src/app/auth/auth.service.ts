import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Users } from '../types/user';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  register(data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }): Observable<{ success: boolean }> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.post<{ success: boolean }>(`${apiUrl}/auth/signup`, data, httpOptions);
  }

  getAllUsers(): Observable<Users> {
    return this.http
      .get<{ success: boolean; users: Users }>(`${apiUrl}/users/get/all`)
      .pipe(map(data => data.users));
  }
}
