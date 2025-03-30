import { Routes } from '@angular/router';
export const errorRoutes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./layout.component').then((m) => m.LayoutComponent),
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      // {
      //   path: 'components',
      //   loadComponent: () =>
      //     import('./pages/error500/error500.component').then(
      //       (m) => m.Error500Component
      //     ),
      // },
      {
        path: '**',
        redirectTo: 'error/404',
        pathMatch: 'full',
      },
    ],
  },
  // {
  //   path: 'components',
  //   loadComponent: () =>
  //     import('./layout.component').then((m) => m.LayoutComponent),
  //   children: [
  //     {
  //       path: '',
  //       redirectTo: 'dashboard',
  //       pathMatch: 'full',
  //     },
  //     {
  //       path: 'components',
  //       loadComponent: () =>
  //         import('./pages/error500/error500.component').then(
  //           (m) => m.Error500Component
  //         ),
  //     },
  //     {
  //       path: '**',
  //       redirectTo: 'error/404',
  //       pathMatch: 'full',
  //     },
  //   ],
  // },
];
