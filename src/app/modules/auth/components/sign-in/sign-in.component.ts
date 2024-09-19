import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { IUser } from '../../../users/types/user.interface';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent {
  @Output() onClose = new EventEmitter();
  loginForm: FormGroup;

  authService = inject(AuthService);
  user: IUser | undefined;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const {email, password} = this.loginForm.value

      this.authService
        .Login(email, password)
        .subscribe({
          next: (data: any) => {
            this.user = { ...data.user };
            this.authService.user = {...data.user}
            localStorage.setItem('token', data.token);
            this.onCancel();
          },
          error: (err) => {
            console.error('Error on login:', err);
          },
        });
    }
  }

  onCancel() {
    this.loginForm.reset({
      email: '',
      password: '',
    });
    this.onClose.emit();
  }
}
