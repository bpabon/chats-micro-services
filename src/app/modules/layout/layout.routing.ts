import { Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { errorRoutes } from '../error/error.routing';
export const layoutRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('../dashboard/dashboard.routing').then(
            (m) => m.dashboardhRoutes
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
      // {
      //   path: 'errors',
      //   children: errorRoutes,
      // },
      // {
      //   path: '**',
      //   redirectTo: 'error/404',
      //   pathMatch: 'full',
      // },
    ],
  },
];
