import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-like-icon',
  templateUrl: './like-icon.component.html',
  styleUrls: ['./like-icon.component.css']
})
export class LikeIconComponent implements OnInit {
  @Input() liked: boolean;

  @Output() handleClick: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  handleOnClick() {
    this.handleClick.emit();
  }
}
