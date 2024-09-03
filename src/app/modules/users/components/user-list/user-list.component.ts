import { Component } from '@angular/core';
export interface User {
  id: number | string;
  last_name: string;
  first_name: string;
  email: string;
  avatar: string;
}

type UserKeys = keyof User;

const USER_DATA: User[] = [
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
  styleUrl: './user-list.component.css',
})
export class UserListComponent {
  displayedColumns: UserKeys[] = [
    'id',
    'avatar',
    'first_name',
    'last_name',
    'email',
  ];
  dataSource: User[] = USER_DATA;
}
