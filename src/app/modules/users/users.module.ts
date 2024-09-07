import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserPageComponent } from './components/user-page/user-page.component';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { ProgressBarModule } from 'primeng/progressbar';
import { MessagesModule } from 'primeng/messages';

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
    DialogModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    ProgressBarModule,
    MessagesModule
  ],
  exports: [
    UserPageComponent
  ],
  providers: [
    provideHttpClient(),
  ]
})
export class UsersModule { }
