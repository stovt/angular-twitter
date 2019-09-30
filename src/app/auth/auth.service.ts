import { HttpClient } from '@angular/common/http';
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

  getAllUsers(): Observable<Users> {
    return this.http
      .get<{ success: boolean; users: Users }>(`${apiUrl}/users/get/all`)
      .pipe(map(data => data.users));
  }
}
