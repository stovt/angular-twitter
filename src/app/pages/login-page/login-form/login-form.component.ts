import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  formData: FormGroup;

  loading: boolean;
  error: string;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.formData = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  onSubmit(data: { email: string; password: string }) {
    this.loading = true;

    const { email, password } = data;

    this.authService.login(email, password).subscribe(
      () => (this.loading = false),
      error => {
        this.loading = false;
        this.error = error;
      }
    );
  }
}
