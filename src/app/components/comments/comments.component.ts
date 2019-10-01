import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../../api/api.service';
import { AuthService } from '../../auth/auth.service';
import { Tweets } from '../../types/tweet';
import { User } from '../../types/user';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  @Input() parent: number;

  user: User;

  loading = false;
  error: string;
  comments: Tweets = [];

  constructor(private authService: AuthService, private apiService: ApiService) {}

  ngOnInit() {
    this.authService.user$.subscribe(user => (this.user = user));

    this.apiService.commentsByTweetId$.subscribe(
      comments => (this.comments = comments[this.parent] || [])
    );
    if (!this.comments.length) {
      this.getTweetComments();
    }
  }

  getTweetComments() {
    this.loading = true;
    this.error = null;

    this.apiService.getTweetComments(this.parent).subscribe(
      () => (this.loading = false),
      error => {
        this.error = error;
        this.loading = false;
      }
    );
  }
}
