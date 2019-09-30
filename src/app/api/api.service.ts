import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Tweets } from '../types/tweet';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getAllTweets(): Observable<Tweets> {
    return this.http
      .get<{ success: boolean; tweets: Tweets }>(`${apiUrl}/tweet/get/all`)
      .pipe(map(data => data.tweets));
  }
}
