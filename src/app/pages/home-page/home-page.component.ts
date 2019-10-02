import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api/api.service';
import { AuthService } from '../../auth/auth.service';
import { Tweets } from '../../types/tweet';
import { User } from '../../types/user';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  user: User;

  userTweetsLoading = false;
  userTweetsError: string;
  userTweets: Tweets = [];

  constructor(private authService: AuthService, private apiService: ApiService) {}

  ngOnInit() {
    this.authService.user$.subscribe(user => (this.user = user));

    if (this.user) {
      this.apiService.tweetsByUserId$.subscribe(
        tweets => (this.userTweets = tweets[this.user.id] || [])
      );
      if (!this.userTweets.length) {
        this.getUserTweets();
      }
    }
  }

  getUserTweets() {
    if (this.user) {
      this.userTweetsLoading = true;
      this.userTweetsError = null;

      this.apiService.getUserTweets(this.user.id).subscribe(
        () => (this.userTweetsLoading = false),
        error => {
          this.userTweetsError = error;
          this.userTweetsLoading = false;
        }
      );
    }
  }
}
