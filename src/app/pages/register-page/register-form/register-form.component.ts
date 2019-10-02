import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
  formData: FormGroup;

  loading: boolean;
  error: string;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.formData = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.minLength(6)),
      confirmPassword: new FormControl('', [Validators.required, this.equalsTo('password')])
    });
  }

  onSubmit(data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) {
    this.loading = true;
    this.error = null;

    const { firstName, lastName, email, password } = data;

    this.authService.register({ firstName, lastName, email, password }).subscribe(
      () => (this.loading = false),
      error => {
        this.loading = false;
        this.error = error;
      }
    );
  }

  private equalsTo(compareTo: string): ValidatorFn {
    return (control: FormControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }

      const compareToControl = control.parent.get(compareTo);
      return compareToControl.value !== control.value
        ? {
            notEquals: true
          }
        : null;
    };
  }
}
