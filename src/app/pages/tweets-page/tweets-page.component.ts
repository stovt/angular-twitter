import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api/api.service';
import { Tweets } from '../../types/tweet';

@Component({
  selector: 'app-tweets-page',
  templateUrl: './tweets-page.component.html',
  styleUrls: ['./tweets-page.component.css']
})
export class TweetsPageComponent implements OnInit {
  loading = false;
  error: string;
  tweets: Tweets = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.allTweets$.subscribe(tweets => (this.tweets = tweets));
    if (!this.tweets.length) {
      this.getAllTweets();
    }
  }

  getAllTweets(): void {
    this.loading = true;
    this.error = null;
    this.apiService.getAllTweets().subscribe(
      () => (this.loading = false),
      error => {
        this.error = error;
        this.loading = false;
      }
    );
  }
}
