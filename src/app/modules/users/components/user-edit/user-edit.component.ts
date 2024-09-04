import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUser } from '../../types/user.interface';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.scss',
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
  @Output() onSave = new EventEmitter<IUser>();
  editForm: FormGroup;

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
    // If the dialog is opened with a user, populate the form
    if (changes['user'] && changes['user'].currentValue) {
      this.editForm.patchValue(this.user);
    }
  }

  onSubmit() {
    if (this.editForm.valid) {
      this.onSave.emit(this.editForm.value);
      this.onClose.emit();
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
