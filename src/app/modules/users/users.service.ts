import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { IUser } from './types/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://orm-flask-python-api.onrender.com/users'; // render.com python api
  private http = inject(HttpClient);

  loading: WritableSignal<boolean> = signal(false);
  errorMessage: WritableSignal<string> = signal('');

  // Fetch all users
  fetchUsers(): Observable<IUser[]> {
    this.setLoading(true);
    return this.http.get<IUser[]>(this.apiUrl).pipe(
      tap(() => this.setLoading(false)),
      catchError((error) => this.handleError(error))
    );
  }

  // Create a new user
  createUser(user: IUser): Observable<IUser> {
    this.setLoading(true);
    return this.http.post<IUser>(this.apiUrl, user).pipe(
      tap(() => this.setLoading(false)),
      catchError((error) => this.handleError(error))
    );
  }

  // Update an existing user
  updateUser(user: Partial<IUser>): Observable<IUser> {
    this.setLoading(true);
    return this.http.put<IUser>(`${this.apiUrl}/${user.id}`, user).pipe(
      tap(() => this.setLoading(false)),
      catchError((error) => this.handleError(error))
    );
  }

  // Delete a user by ID
  deleteUser(user: IUser): Observable<void> {
    this.setLoading(true);
    return this.http.delete<void>(`${this.apiUrl}/${user.id}`).pipe(
      tap(() => this.setLoading(false)),
      catchError((error) => this.handleError(error))
    );
  }

  // Method to set the loading state
  private setLoading(isLoading: boolean) {
    this.loading.set(isLoading);
  }

  // Error handling method
  private handleError(error: HttpErrorResponse) {
    console.error('Error:', error);
    this.setLoading(false);
    this.errorMessage.set('An error occurred. Please try again later.');
    return throwError(() => new Error('An error occurred.'));
  }
}
