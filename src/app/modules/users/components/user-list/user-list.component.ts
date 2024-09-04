import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { IUser } from '../../types/user.interface';
import { UserService } from '../../users.service';
import { faker } from '@faker-js/faker';

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
  @Input() dataSource: IUser[] = [];
  @Output() onClickEdit = new EventEmitter<IUser>();
  @Output() onClickDelete = new EventEmitter<IUser>();

  onEdit(user:IUser){
    this.onClickEdit.emit(user);
  }

  onDelete(user:IUser){
    this.onClickDelete.emit(user);
  }
}
