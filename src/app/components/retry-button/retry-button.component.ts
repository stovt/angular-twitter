import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-retry-button',
  templateUrl: './retry-button.component.html',
  styleUrls: ['./retry-button.component.css']
})
export class RetryButtonComponent implements OnInit {
  @Input() show: boolean;

  @Output() handleClick: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  handleOnClick() {
    this.handleClick.emit();
  }
}
