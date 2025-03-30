import { Routes } from '@angular/router';
export const authRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./auth.component').then((m) => m.AuthComponent),
    children: [
      {
        path: '',
        redirectTo: 'sign-in',
        pathMatch: 'full',
      },
      {
        path: 'sign-in',
        loadComponent: () =>
          import('./pages/sing-in/sing-in.component').then(
            (m) => m.SingInComponent
          ),
      },
      {
        path: 'sign-up',
        loadComponent: () =>
          import('./pages/sign-up/sign-up.component').then(
            (m) => m.SignUpComponent
          ),
      },
      {
        path: 'forgot-password',
        loadComponent: () =>
          import('./pages/forgot-password/forgot-password.component').then(
            (m) => m.ForgotPasswordComponent
          ),
      },
      {
        path: '**',
        redirectTo: 'sign-in',
        pathMatch: 'full',
      },
    ],
  },
];
