import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IUser } from './types/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000/users'; // Base URL for the API
  private http = inject(HttpClient);

  // Fetch all users
  fetchUsers(): Observable<IUser[]> {
    return this.http
      .get<IUser[]>(this.apiUrl).pipe(
      map((response: IUser[]) => response),
      catchError(this.handleError)
    );
  }

  // Create a new user
  createUser(user: IUser): Observable<IUser> {
    return this.http
      .post<IUser>(this.apiUrl, user)
      .pipe(catchError(this.handleError));
  }

  // Update an existing user
  updateUser(id: number | string, user: Partial<IUser>): Observable<IUser> {
    return this.http
      .put<IUser>(`${this.apiUrl}/${id}`, user)
      .pipe(catchError(this.handleError));
  }

  // Delete a user by ID
  deleteUser(id: number | string): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Error handling method
  private handleError(error: HttpErrorResponse) {
    console.error('Error with HTTP request:', error);
    return throwError(
      () => new Error('An error occurred. Please try again later.')
    );
  }
}
