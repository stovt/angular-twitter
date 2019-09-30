import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../api/api.service';
import { Tweets } from '../../types/tweet';
import { User } from '../../types/user';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  userLoading = false;
  userError: string;
  user: User;

  userTweetsLoading = false;
  userTweetsError: string;
  userTweets: Tweets = [];

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    this.apiService.usersById$.subscribe(users => (this.user = users[id]));
    if (!this.user) {
      this.getUser();
    }

    this.apiService.tweetsByUserId$.subscribe(tweets => (this.userTweets = tweets[id] || []));
    if (!this.userTweets.length) {
      this.getUserTweets();
    }
  }

  getUser() {
    this.userLoading = true;
    this.userError = null;

    const id = this.route.snapshot.paramMap.get('id');

    this.apiService.getUser(id).subscribe(
      () => (this.userLoading = false),
      error => {
        this.userError = error;
        this.userLoading = false;
      }
    );
  }

  getUserTweets() {
    this.userTweetsLoading = true;
    this.userTweetsError = null;

    const id = this.route.snapshot.paramMap.get('id');

    this.apiService.getUserTweets(id).subscribe(
      () => (this.userTweetsLoading = false),
      error => {
        this.userTweetsError = error;
        this.userTweetsLoading = false;
      }
    );
  }
}
