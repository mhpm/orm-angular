import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';
import { IUser } from '../users/types/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:5001/';
  private http = inject(HttpClient);
  loading: WritableSignal<boolean> = signal(false);
  user: IUser | undefined;

  Login(email: string, password: string) {
    this.loading.set(true);
    return this.http.post(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(() => this.loading.set(false)),
      catchError((error) => this.handleError(error))
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Error:', error);
    this.loading.set(false);
    return throwError(() => new Error('An error occurred.'));
  }
}
