import { Component, Input, OnInit } from '@angular/core';
import { formatDistanceToNow } from 'date-fns';
import { Tweet } from '../../types/tweet';
@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css']
})
export class TweetComponent implements OnInit {
  @Input() tweet: Tweet;

  showComments = false;

  constructor() {}

  ngOnInit() {}

  toggleComments() {
    this.showComments = !this.showComments;
  }

  likeTweet() {
    alert('like tweet');
  }

  removeTweet() {
    alert('remove tweet');
  }

  get fullName() {
    return `${this.tweet.user.firstName} ${this.tweet.user.lastName}`;
  }

  get date() {
    return formatDistanceToNow(new Date(this.tweet.createdAt));
  }
}
