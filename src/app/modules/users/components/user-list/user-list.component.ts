import { Component } from '@angular/core';
import { IUser } from '../../types/user.interface';

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
export class UserListComponent {
  displayedColumns = [
    'id',
    'avatar',
    'first_name',
    'last_name',
    'email',
    'edit',
    'delete',
  ];
  dataSource: IUser[] = USER_DATA;
  isEditFormVisible: boolean = false;
  selectedUser: IUser = { id: '', first_name: '', last_name: '', email: '' };

  deleteUser(element: IUser) {
    this.dataSource = this.dataSource.filter((el) => el.id !== element.id);
  }

  editUser(user: IUser) {
    this.isEditFormVisible = true;
    this.selectedUser = {...user};
  }

  onUserSave(updatedUser: IUser) {
    console.log('updatedUser: ', updatedUser);
    this.dataSource = this.dataSource.map((user) =>
      user.id === updatedUser.id ? { ...updatedUser } : user
    );
  }
}
