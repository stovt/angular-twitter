import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Tweets } from '../types/tweet';
import { User, Users } from '../types/user';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly _allUsers = new BehaviorSubject<Users>([]);
  private readonly _usersById = new BehaviorSubject<{ [key: number]: User }>({});
  private readonly _allTweets = new BehaviorSubject<Tweets>([]);
  private readonly _tweetsByUserId = new BehaviorSubject<{ [key: number]: Tweets }>({});

  readonly allUsers$ = this._allUsers.asObservable();
  readonly usersById$ = this._usersById.asObservable();
  readonly allTweets$ = this._allTweets.asObservable();
  readonly tweetsByUserId$ = this._tweetsByUserId.asObservable();

  get allUsers(): Users {
    return this._allUsers.getValue();
  }
  set allUsers(val: Users) {
    this._allUsers.next(val);
  }

  get usersById(): { [key: number]: User } {
    return this._usersById.getValue();
  }
  set usersById(val: { [key: number]: User }) {
    this._usersById.next(val);
  }

  get allTweets(): Tweets {
    return this._allTweets.getValue();
  }
  set allTweets(val: Tweets) {
    this._allTweets.next(val);
  }

  get tweetsByUserId(): { [key: number]: Tweets } {
    return this._tweetsByUserId.getValue();
  }
  set tweetsByUserId(val: { [key: number]: Tweets }) {
    this._tweetsByUserId.next(val);
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

  getUser(id: string): Observable<User> {
    return this.http.get<{ success: boolean; user: User }>(`${apiUrl}/users/get/${id}`).pipe(
      map(data => {
        this.usersById = {
          ...this.usersById,
          [id]: data.user
        };
        return data.user;
      })
    );
  }

  getUserTweets(userId: string) {
    return this.http
      .get<{ success: boolean; tweets: Tweets }>(`${apiUrl}/tweet/get/user/${userId}`)
      .pipe(
        map(data => {
          this.tweetsByUserId = {
            ...this.tweetsByUserId,
            [userId]: data.tweets
          };
          return data.tweets;
        })
      );
  }
}
