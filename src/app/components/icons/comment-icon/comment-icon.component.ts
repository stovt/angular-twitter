import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-comment-icon',
  templateUrl: './comment-icon.component.html',
  styleUrls: ['./comment-icon.component.css']
})
export class CommentIconComponent implements OnInit {
  @Output() handleClick: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  handleOnClick() {
    this.handleClick.emit();
  }
}
