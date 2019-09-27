import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-error-handler',
  templateUrl: './loading-error-handler.component.html',
  styleUrls: ['./loading-error-handler.component.css']
})
export class LoadingErrorHandlerComponent implements OnInit {
  @Input() loading: boolean;

  @Input() error: string;

  constructor() {}

  ngOnInit() {}
}
