import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { IUser } from '../../../modules/users/types/user.interface';
import { AuthService } from '../../../modules/auth/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit, OnDestroy {
  private authSubscription!: Subscription;
  private currentUserSubscription!: Subscription;
  items: MenuItem[] | undefined;
  user: IUser | undefined;
  isLoginFormVisible = false;
  isLoggedIn = false;

  authService = inject(AuthService);
  router = inject(Router);

  ngOnInit() {
    this.authSubscription = this.authService.userStatus$.subscribe(
      (isLoggedIn) => {
        this.isLoggedIn = isLoggedIn;
        this.items = [
          {
            label: 'Home',
            icon: 'pi pi-home',
            command: () => {
              this.router.navigate(['/']);
            },
          },
          {
            label: 'Users',
            icon: 'pi pi-users',
            command: () => {
              this.router.navigate(['/users']);
            },
          },
          {
            label: 'Posts',
            icon: 'pi pi-instagram',
            routerLink: 'posts',
            visible: isLoggedIn,
            command: () => {
              this.router.navigate(['/posts']);
            },
          },
        ];
      }
    );
    this.currentUserSubscription = this.authService.currentUser$.subscribe(
      (user) => (this.user = user)
    );
  }

  onLogin() {
    this.isLoginFormVisible = true;
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    // Unsubscribe to prevent memory leaks
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
