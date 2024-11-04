import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, tap, throwError, BehaviorSubject, Observable } from 'rxjs';
import { IUser } from '../users/types/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // BehaviorSubject to hold the current authentication status
  private userStatusSubject = new BehaviorSubject<boolean>(false);

  // Observable for components to subscribe to
  userStatus$: Observable<boolean> = this.userStatusSubject.asObservable();

  // BehaviorSubject to hold the current user information
  private currentUserSubject: BehaviorSubject<IUser | undefined>;
  currentUser$: Observable<IUser | undefined>;

  // For role management (e.g., admin)
  isAdminUser = false;

  private apiUrl = 'https://orm-flask-python-api.onrender.com';
  private http = inject(HttpClient);
  private router = inject(Router);
  loading: WritableSignal<boolean> = signal(false);
  user: IUser | undefined;
  errorMessage: WritableSignal<string> = signal('');

  constructor() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    this.userStatusSubject.next(isLoggedIn);

    const userData = JSON.parse(localStorage.getItem('currentUser')!);
    this.currentUserSubject = new BehaviorSubject<IUser | undefined>(userData);
    this.currentUser$ = this.currentUserSubject.asObservable();

    this.isAdminUser = localStorage.getItem('isAdmin') === 'true';
  }

  Login(email: string, password: string) {
    this.loading.set(true);
    return this.http.post(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((data: any) => {
        this.loading.set(false);

        this.userStatusSubject.next(true);
        localStorage.setItem('isLoggedIn', 'true');

        this.currentUserSubject.next(data.user);
        localStorage.setItem('currentUser', JSON.stringify(data.user));

        if (data.user.role === 'admin') {
          this.isAdminUser = true;
          localStorage.setItem('isAdmin', 'true');
          this.router.navigate(['/users']);
        } else {
          this.isAdminUser = false;
          localStorage.setItem('isAdmin', 'false');
          this.router.navigate(['/news']);
        }
      }),
      catchError((error) => this.handleError(error))
    );
  }

  // Method to log out the user
  logout(): void {
    // Clear authentication status
    this.userStatusSubject.next(false);
    localStorage.removeItem('isLoggedIn');

    // Clear admin status
    this.isAdminUser = false;
    localStorage.removeItem('isAdmin');

    // Clear user information
    this.currentUserSubject.next(undefined);
    localStorage.removeItem('currentUser');

    localStorage.removeItem('token');

    this.router.navigate(['/']);
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    return this.getCurrentUser() !== undefined;
  }

  // Getter for current user
  getCurrentUser(): IUser | undefined {
    return this.currentUserSubject.value;
  }

  // Method to check if the user is an admin
  isAdmin(): boolean {
    return this.isAdminUser;
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Error:', error);
    this.loading.set(false);
    this.errorMessage.set(error.error.error);
    return throwError(() => new Error('An error occurred.'));
  }
}
