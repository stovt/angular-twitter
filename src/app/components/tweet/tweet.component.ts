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

  fullName: string;
  date: string;

  constructor() {}

  ngOnInit() {
    this.fullName = `${this.tweet.user.firstName} ${this.tweet.user.lastName}`;
    this.date = formatDistanceToNow(new Date(this.tweet.createdAt));
  }
}
