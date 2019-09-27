import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api/api.service';

@Component({
  selector: 'app-tweets-page',
  templateUrl: './tweets-page.component.html',
  styleUrls: ['./tweets-page.component.css']
})
export class TweetsPageComponent implements OnInit {
  loading = false;
  error: string;
  tweets = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loading = true;
    this.apiService.getAllTweets().subscribe(
      data => {
        this.tweets = data.tweets;
        this.loading = false;
      },
      error => {
        this.error = error;
        this.loading = false;
      }
    );
  }
}
