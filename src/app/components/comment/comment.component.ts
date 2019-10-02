import { Component, Input, OnInit } from '@angular/core';
import { formatDistanceToNow } from 'date-fns';
import { Tweet } from '../../types/tweet';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() comment: Tweet;

  constructor() {}

  ngOnInit() {}

  get fullName() {
    return `${this.comment.user.firstName} ${this.comment.user.lastName}`;
  }

  get date() {
    return formatDistanceToNow(new Date(this.comment.createdAt));
  }
}
