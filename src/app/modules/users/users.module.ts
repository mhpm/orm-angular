import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserPageComponent } from './components/user-page/user-page.component';



@NgModule({
  declarations: [
    UserEditComponent,
    UserListComponent,
    UserPageComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    UserPageComponent
  ]
})
export class UsersModule { }
