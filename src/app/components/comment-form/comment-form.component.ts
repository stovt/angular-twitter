import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../api/api.service';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent implements OnInit {
  @Input() parent: number;

  formData: FormGroup;

  loading: boolean;
  error: string;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.formData = new FormGroup({
      message: new FormControl('', Validators.required)
    });
  }

  onSubmit(data: { message: string }) {
    this.loading = true;
    this.error = null;

    const { message } = data;

    this.apiService.tweet(message.replace(/\r?\n/g, '<br/>'), this.parent).subscribe(
      () => {
        this.loading = false;
        this.formData.reset();
      },
      error => {
        this.loading = false;
        this.error = error;
      }
    );
  }
}
