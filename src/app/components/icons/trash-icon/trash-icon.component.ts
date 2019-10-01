import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-trash-icon',
  templateUrl: './trash-icon.component.html',
  styleUrls: ['./trash-icon.component.css']
})
export class TrashIconComponent implements OnInit {
  @Output() handleClick: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  handleOnClick() {
    this.handleClick.emit();
  }
}
