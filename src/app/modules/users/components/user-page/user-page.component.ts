import { Component, inject, OnInit } from '@angular/core';
import { IUser } from '../../types/user.interface';
import { UserService } from '../../users.service';
import { faker } from '@faker-js/faker';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.css',
})
export class UserPageComponent {
  displayedColumns = [
    'id',
    'avatar',
    'first_name',
    'last_name',
    'email',
    'edit',
    'delete',
  ];
  dataSource: IUser[] = [];
  isEditFormVisible: boolean = false;
  selectedUser: IUser = { id: '', first_name: '', last_name: '', email: '' };
  isLoading = false;

  private userService = inject(UserService);

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.isEditFormVisible = false;
    this.userService.fetchUsers().subscribe({
      next: (users) => (this.dataSource = users),
      complete: () => console.log('completed'),
      error: (err) => console.error('Error fetching users:', err),
    });
  }

  addUser() {
    this.isLoading = true;
    const newUser: IUser = {
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      email: faker.internet.email(),
      avatar: faker.image.avatarGitHub(),
      role: 'admin',
      password: 'changeme',
    };

    this.userService.createUser(newUser).subscribe({
      next: (user) => {
        this.loadUsers();
      },
      complete: () => (this.isLoading = false),
      error: (err) => {
        console.error('Error creating user:', err);
        this.isLoading = true;
      },
    });
  }

  deleteUser(user: IUser) {
    this.userService.deleteUser(user).subscribe({
      next: () => {
        this.loadUsers();
      },
      error: (err) => console.error('Error deleting user:', err),
    });
  }

  editUser(user: IUser) {
    this.isEditFormVisible = true;
    this.selectedUser = { ...user };
  }
}
