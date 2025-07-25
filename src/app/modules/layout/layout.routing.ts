import { Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
export const layoutRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
      children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadComponent: () =>
          import('../dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
      },
      // {
      //   path: 'components',
      //   component: LayoutComponent,
      //   loadChildren: () =>
      //     import('../../uikit/uikit.routing').then(
      //       (m) => m.uikitRoutes
      //     ),
      // },
      {
        path: '**',
        redirectTo: 'error/404',
        pathMatch: 'full',
      },
    ],
  }
];
