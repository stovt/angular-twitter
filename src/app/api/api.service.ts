import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Tweets } from '../types/tweet';
import { Users } from '../types/user';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly _allUsers = new BehaviorSubject<Users>([]);
  private readonly _allTweets = new BehaviorSubject<Tweets>([]);

  readonly allTweets$ = this._allTweets.asObservable();
  readonly allUsers$ = this._allUsers.asObservable();

  get allTweets(): Tweets {
    return this._allTweets.getValue();
  }
  set allTweets(val: Tweets) {
    this._allTweets.next(val);
  }

  get allUsers(): Users {
    return this._allUsers.getValue();
  }
  set allUsers(val: Users) {
    this._allUsers.next(val);
  }

  constructor(private http: HttpClient) {}

  getAllTweets(): Observable<Tweets> {
    return this.http.get<{ success: boolean; tweets: Tweets }>(`${apiUrl}/tweet/get/all`).pipe(
      map(data => {
        this.allTweets = data.tweets;
        return data.tweets;
      })
    );
  }

  getAllUsers(): Observable<Users> {
    return this.http.get<{ success: boolean; users: Users }>(`${apiUrl}/users/get/all`).pipe(
      map(data => {
        this.allUsers = data.users;
        return data.users;
      })
    );
  }
}
