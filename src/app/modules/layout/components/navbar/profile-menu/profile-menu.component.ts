import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ThemeService } from '../../../../../core/services/theme.service';
// import { ClickOutsideDirective } from '../../../../../shared/directives/click-outside.directive';
import { Router } from '@angular/router';
import { AuthService } from '../../../../auth/services/auth.service';
import { NgClass } from '@angular/common';
@Component({
  selector: 'app-profile-menu',
  imports: [RouterLink, AngularSvgIconModule, NgClass],
  templateUrl: './profile-menu.component.html',
  styleUrl: './profile-menu.component.css',
  animations: [
    trigger('openClose', [
      state(
        'open',
        style({
          opacity: 1,
          transform: 'translateY(0)',
          visibility: 'visible',
        }),
      ),
      state(
        'closed',
        style({
          opacity: 0,
          transform: 'translateY(-20px)',
          visibility: 'hidden',
        }),
      ),
      transition('open => closed', [animate('0.2s')]),
      transition('closed => open', [animate('0.2s')]),
    ]),
  ],
})
export class ProfileMenuComponent implements OnInit {
  public isOpen = false;
  public profileMenu = [
    // {
    //   title: 'Your Profile',
    //   icon: 'icons/heroicons/outline/user-circle.svg',
    //   link: '/profile',
    //   logout: false,
    // },
    // {
    //   title: 'Settings',
    //   icon: 'icons/heroicons/outline/cog-6-tooth.svg',
    //   link: '/settings',
    //   logout: false,
    // },
    {
      title: 'Log out',
      icon: 'icons/heroicons/outline/logout.svg',
      link: '/auth',
      logout: true,
    },
  ];

  public themeColors = [
    {
      name: 'base',
      code: '#e11d48',
    },
    {
      name: 'yellow',
      code: '#f59e0b',
    },
    {
      name: 'green',
      code: '#22c55e',
    },
    {
      name: 'blue',
      code: '#3b82f6',
    },
    {
      name: 'orange',
      code: '#ea580c',
    },
    {
      name: 'red',
      code: '#cc0022',
    },
    {
      name: 'violet',
      code: '#6d28d9',
    },
  ];

  public themeMode = ['light', 'dark'];

  constructor(
    public themeService: ThemeService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  public toggleMenu(): void {
    this.isOpen = !this.isOpen;
  }

  toggleThemeMode() {
    this.themeService.theme.update((theme) => {
      const mode = !this.themeService.isDark ? 'dark' : 'light';
      return { ...theme, mode: mode };
    });
  }
  handleMenuClick(item: any): void {
  if (item.logout) {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }
}


  toggleThemeColor(color: string) {
    this.themeService.theme.update((theme) => {
      return { ...theme, color: color };
    });
  }
}
