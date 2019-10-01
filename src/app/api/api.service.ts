import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AuthService } from '../auth/auth.service';
import { Tweet, Tweets } from '../types/tweet';
import { User, Users } from '../types/user';

const apiUrl = environment.apiUrl;

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly _allUsers = new BehaviorSubject<Users>([]);
  private readonly _usersById = new BehaviorSubject<{ [key: number]: User }>({});
  private readonly _tweetsByUserId = new BehaviorSubject<{ [key: number]: Tweets }>({});
  private readonly _commentsByTweetId = new BehaviorSubject<{ [key: number]: Tweets }>({});

  readonly allUsers$ = this._allUsers.asObservable();
  readonly usersById$ = this._usersById.asObservable();
  readonly tweetsByUserId$ = this._tweetsByUserId.asObservable().pipe(
    map(tweets => {
      const sortedTweetsByUserId = {};
      for (const key of Object.keys(tweets)) {
        sortedTweetsByUserId[key] = tweets[key].sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      }
      return sortedTweetsByUserId;
    })
  );
  readonly commentsByTweetId$ = this._commentsByTweetId.asObservable().pipe(
    map(comments => {
      const sortedCommentsByTweetId = {};
      for (const key of Object.keys(comments)) {
        sortedCommentsByTweetId[key] = comments[key].sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      }
      return sortedCommentsByTweetId;
    })
  );

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

  get tweetsByUserId(): { [key: number]: Tweets } {
    return this._tweetsByUserId.getValue();
  }
  set tweetsByUserId(val: { [key: number]: Tweets }) {
    this._tweetsByUserId.next(val);
  }

  get commentsByTweetId(): { [key: number]: Tweets } {
    return this._commentsByTweetId.getValue();
  }
  set commentsByTweetId(val: { [key: number]: Tweets }) {
    this._commentsByTweetId.next(val);
  }

  constructor(private http: HttpClient, private authService: AuthService) {}

  getAllTweets(): Observable<Tweets> {
    return this.http.get<{ success: boolean; tweets: Tweets }>(`${apiUrl}/tweet/get/all`).pipe(
      map(data => {
        return data.tweets.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
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

  getUser(id: number): Observable<User> {
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

  getUserTweets(userId: number) {
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

  tweet(message: string, parent?: number) {
    const userId = this.authService.user ? this.authService.user.id : null;

    return this.http
      .post<{ success: boolean; tweet: Tweet }>(
        `${apiUrl}/tweet/create`,
        { message, parent },
        httpOptions
      )
      .pipe(
        map(data => {
          const { tweet } = data;

          if (parent) {
            // comment
            if (this.commentsByTweetId[parent]) {
              this.commentsByTweetId = {
                ...this.commentsByTweetId,
                [parent]: [...this.commentsByTweetId[parent], tweet]
              };
            } else {
              this.commentsByTweetId = {
                ...this.commentsByTweetId,
                [parent]: [tweet]
              };
            }
          } else if (userId) {
            // new tweet
            if (this.tweetsByUserId[userId]) {
              this.tweetsByUserId = {
                ...this.tweetsByUserId,
                [userId]: [...this.tweetsByUserId[userId], tweet]
              };
            } else {
              this.tweetsByUserId = {
                ...this.tweetsByUserId,
                [userId]: [tweet]
              };
            }
          }

          return data.tweet;
        })
      );
  }

  likeTweet(id: number) {
    return this.http
      .post<{ success: boolean; tweet: Tweet }>(`${apiUrl}/like/${id}`, undefined, httpOptions)
      .pipe(
        map(data => {
          const { tweet } = data;

          if (this.tweetsByUserId[tweet.userId]) {
            this.tweetsByUserId = {
              ...this.tweetsByUserId,
              [tweet.userId]: [
                ...this.tweetsByUserId[tweet.userId].filter(t => t.id !== tweet.id),
                tweet
              ]
            };
          }

          return data.tweet;
        })
      );
  }

  removeTweet(id: number) {
    return this.http
      .post<{ success: boolean }>(`${apiUrl}/tweet/delete/${id}`, undefined, httpOptions)
      .pipe(
        map(data => {
          if (this.authService.user && this.tweetsByUserId[this.authService.user.id]) {
            this.tweetsByUserId = {
              ...this.tweetsByUserId,
              [this.authService.user.id]: [
                ...this.tweetsByUserId[this.authService.user.id].filter(tweet => tweet.id !== id)
              ]
            };
          }

          return data;
        })
      );
  }

  getTweetComments(parent: number) {
    return this.http
      .get<{ success: boolean; tweets: Tweets }>(`${apiUrl}/tweet/get/parent/${parent}`)
      .pipe(
        map(data => {
          this.commentsByTweetId = {
            ...this.commentsByTweetId,
            [parent]: data.tweets
          };

          return data.tweets;
        })
      );
  }
}
