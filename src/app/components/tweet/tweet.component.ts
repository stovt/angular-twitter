import { Component, Input, OnInit } from '@angular/core';
import { formatDistanceToNow } from 'date-fns';
import { ApiService } from '../../api/api.service';
import { AuthService } from '../../auth/auth.service';
import { Tweet } from '../../types/tweet';
import { User } from '../../types/user';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css']
})
export class TweetComponent implements OnInit {
  @Input() tweet: Tweet;

  user: User;

  showComments = false;
  canRemove = false;

  likeTweetLoading = false;
  likeTweetError: string;

  removeTweetLoading = false;
  removeTweetError: string;

  constructor(private authService: AuthService, private apiService: ApiService) {}

  ngOnInit() {
    this.authService.user$.subscribe(user => {
      this.user = user;
      if (user) {
        this.canRemove = user.id === this.tweet.userId;
      } else {
        this.canRemove = false;
      }
    });
  }

  toggleComments() {
    this.showComments = !this.showComments;
  }

  likeTweet() {
    this.likeTweetLoading = true;
    this.likeTweetError = null;

    this.apiService.likeTweet(this.tweet.id).subscribe(
      () => (this.likeTweetLoading = false),
      error => {
        this.likeTweetError = error;
        this.likeTweetLoading = false;
      }
    );
  }

  removeTweet() {
    this.removeTweetLoading = true;
    this.removeTweetError = null;

    this.apiService.removeTweet(this.tweet.id).subscribe(
      () => (this.removeTweetLoading = false),
      error => {
        this.removeTweetError = error;
        this.removeTweetLoading = false;
      }
    );
  }

  get fullName() {
    return `${this.tweet.user.firstName} ${this.tweet.user.lastName}`;
  }

  get date() {
    return formatDistanceToNow(new Date(this.tweet.createdAt));
  }
}
