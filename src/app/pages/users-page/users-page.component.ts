import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api/api.service';
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

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.allUsers$.subscribe(users => (this.users = users));
    if (!this.users.length) {
      this.getAllUsers();
    }
  }

  getAllUsers(): void {
    this.loading = true;
    this.error = null;
    this.apiService.getAllUsers().subscribe(
      () => (this.loading = false),
      error => {
        this.error = error;
        this.loading = false;
      }
    );
  }
}
