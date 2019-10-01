import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../api/api.service';

@Component({
  selector: 'app-tweet-form',
  templateUrl: './tweet-form.component.html',
  styleUrls: ['./tweet-form.component.css']
})
export class TweetFormComponent implements OnInit {
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

    const { message } = data;

    this.apiService.tweet(message).subscribe(
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
