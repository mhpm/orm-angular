import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserPageComponent } from './components/user-page/user-page.component';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';


@NgModule({
  declarations: [
    UserEditComponent,
    UserListComponent,
    UserPageComponent
  ],
  imports: [
    CommonModule,
    AvatarModule,
    BadgeModule,
    ButtonModule,
    TableModule,
  ],
  exports: [
    UserPageComponent
  ]
})
export class UsersModule { }
