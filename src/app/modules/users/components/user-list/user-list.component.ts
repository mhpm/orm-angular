import { Component, inject, OnInit, signal, Signal, WritableSignal } from '@angular/core';
import { IUser } from '../../types/user.interface';
import { UserService } from '../../users.service';
import { faker } from '@faker-js/faker';

const USER_DATA: IUser[] = [
  {
    id: 'a04b',
    first_name: 'Royce',
    last_name: 'Block-Weissnat',
    email: 'Odessa_Blick-Senger39@hotmail.com',
    avatar: 'https://avatars.githubusercontent.com/u/28780764',
  },
  {
    id: '8c9d',
    first_name: 'Junius',
    last_name: 'Wunsch',
    email: 'Grant1@hotmail.com',
    avatar: 'https://avatars.githubusercontent.com/u/13078553',
  },
  {
    id: '2586',
    first_name: 'Russ',
    last_name: 'Thompson',
    email: 'Manley.Cormier@yahoo.com',
    avatar: 'https://avatars.githubusercontent.com/u/75310247',
  },
  {
    id: '4c94',
    first_name: 'Laverne',
    last_name: 'Moore',
    email: 'Brice22@hotmail.com',
    avatar: 'https://avatars.githubusercontent.com/u/67918056',
  },
];
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent implements OnInit {
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
  errorMessage = ''

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

  // onUserSave(updatedUser: IUser) {
  //   console.log('updatedUser: ', updatedUser);
  //   this.dataSource = this.dataSource.map((user) =>
  //     user.id === updatedUser.id ? { ...updatedUser } : user
  //   );
  // }
}
