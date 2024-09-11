import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://reqres.in/api/login';
  private http = inject(HttpClient);
  loading: WritableSignal<boolean> = signal(false);

  Login() {
    this.loading.set(true);
    return this.http.post(this.apiUrl, { emai: '', password: '' }).pipe(
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
