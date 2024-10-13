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
  items: MenuItem[] | undefined;
  user: IUser | undefined;
  isLoginFormVisible = false;
  authService = inject(AuthService);
  router = inject(Router);

  ngOnInit() {
    this.authSubscription = this.authService.currentUser$.subscribe((user) => {
      this.user = user;
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
          visible: user?.role === 'admin',
          command: () => {
            this.router.navigate(['/users']);
          },
        },
        {
          label: 'Posts',
          icon: 'pi pi-instagram',
          routerLink: 'posts',
          visible: user != null,
          command: () => {
            this.router.navigate(['/posts']);
          },
        },
      ];
    });
  }

  onLogin() {
    this.isLoginFormVisible = true;
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
