import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Users } from '../../types/user';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.css']
})
export class UsersPageComponent implements OnInit {
  loading = false;
  error: string;
  users: Users = [];

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.loading = true;
    this.authService.getAllUsers().subscribe(
      users => {
        this.users = users;
        this.loading = false;
      },
      error => {
        this.error = error;
        this.loading = false;
      }
    );
  }
}
