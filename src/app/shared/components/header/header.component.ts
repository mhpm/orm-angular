import { Component, inject, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { IUser } from '../../../modules/users/types/user.interface';
import { AuthService } from '../../../modules/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  items: MenuItem[] | undefined;
  user: IUser | undefined;
  isLoginFormVisible = false;

  authService = inject(AuthService);

  ngOnInit() {
    this.items = [
      {
        label: 'Users',
        icon: 'pi pi-users',
      },
      {
        label: 'News',
        icon: 'pi pi-twitch',
      },
      // {
      //   label: 'Projects',
      //   icon: 'pi pi-search',
      //   items: [
      //     {
      //       label: 'Core',
      //       icon: 'pi pi-bolt',
      //       shortcut: '⌘+S',
      //     },
      //     {
      //       label: 'Blocks',
      //       icon: 'pi pi-server',
      //       shortcut: '⌘+B',
      //     },
      //     {
      //       label: 'UI Kit',
      //       icon: 'pi pi-pencil',
      //       shortcut: '⌘+U',
      //     },
      //     {
      //       separator: true,
      //     },
      //     {
      //       label: 'Templates',
      //       icon: 'pi pi-palette',
      //       items: [
      //         {
      //           label: 'Apollo',
      //           icon: 'pi pi-palette',
      //           badge: '2',
      //         },
      //         {
      //           label: 'Ultima',
      //           icon: 'pi pi-palette',
      //           badge: '3',
      //         },
      //       ],
      //     },
      //   ],
      // },
      // {
      //   label: 'Contact',
      //   icon: 'pi pi-envelope',
      //   badge: '3',
      // },
    ];
  }

  onLogin() {
    this.isLoginFormVisible = true;
  }
}
