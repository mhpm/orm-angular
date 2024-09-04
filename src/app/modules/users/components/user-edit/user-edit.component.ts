import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IUser } from '../../types/user.interface';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.scss',
})
export class UserEditComponent {
  @Input() user: IUser = { id: '', first_name: '', last_name: '', email: '' };
  @Output() onClose = new EventEmitter();
  @Output() onSave = new EventEmitter<IUser>();

  onSubmit() {
    this.onSave.emit(this.user);
    this.onClose.emit();
  }

  onCancel() {
    this.onClose.emit();
  }
}
