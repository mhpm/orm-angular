import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUser } from '../../types/user.interface';
import { UserService } from '../../users.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css',
})
export class UserEditComponent implements OnChanges {
  @Input() user: IUser = {
    id: '',
    first_name: '',
    last_name: '',
    email: '',
    avatar: '',
  };
  @Output() onClose = new EventEmitter();
  @Output() onSave = new EventEmitter();
  editForm: FormGroup;

  userService = inject(UserService);

  constructor(private fb: FormBuilder) {
    this.editForm = this.fb.group({
      id: ['', [Validators.required]],
      first_name: ['', [Validators.required, Validators.minLength(2)]],
      last_name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      avatar: [''],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user'] && changes['user'].currentValue) {
      this.editForm.patchValue(this.user);
    }
  }

  onSubmit() {
    if (this.editForm.valid) {
      const updateUser: Partial<IUser> = { ...this.editForm.value };
      this.userService.updateUser(updateUser).subscribe({
        next: (updated) => this.onSave.emit(),
        error: (err) => console.error('Error updating user:', err),
      });
    }
  }

  onCancel() {
    this.editForm.reset({
      id: '',
      first_name: '',
      last_name: '',
      email: '',
      avatar: '',
    });
    this.onClose.emit();
  }
}
