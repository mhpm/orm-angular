import { Component, inject, OnInit } from '@angular/core';
import { IUser } from '../../types/user.interface';
import { UserService } from '../../users.service';
import { faker } from '@faker-js/faker';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.scss'
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

  private userService = inject(UserService);

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.fetchUsers().subscribe({
      next: (users) => this.dataSource = users,
      error: (err) => console.error('Error fetching users:', err),
    });
  }

  addUser() {
    const newUser: IUser = {
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      email: faker.internet.email(),
      avatar: faker.image.avatarGitHub(),
    };

    this.userService.createUser(newUser).subscribe({
      next: (user) => {
        console.log('User created:', user);
        this.loadUsers();
      },
      error: (err) => console.error('Error creating user:', err),
    });
  }

  updateUser(user: IUser) {
    const updatedUser: Partial<IUser> = { ...user };
    this.userService.updateUser(user.id!, updatedUser).subscribe({
      next: (updated) => {
        console.log('User updated:', updated);
        this.loadUsers();
      },
      error: (err) => console.error('Error updating user:', err),
    });
  }

  deleteUser(user: IUser) {
    this.userService.deleteUser(user.id!).subscribe({
      next: () => {
        console.log('User deleted');
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
