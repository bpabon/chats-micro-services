import { Routes } from '@angular/router';
import { errorRoutes } from './modules/error/error.routing';
import { authGuard } from './core/guards/auth.guard';
export const routes: Routes =  [
    {
      path: '',
      loadComponent: () =>
        import('./core/shared/components/redirect/redirect.component').then((m) => m.RedirectComponent),
      },
    {
      path: 'errors',
      children: errorRoutes
    },
    {
      path: 'auth',
      loadChildren: () => import('./modules/auth/auth.routing').then(r => r.authRoutes)
    },
    {
      path: 'home',
      canActivate: [authGuard],
      loadChildren: () => import('./modules/layout/layout.routing').then(r => r.layoutRoutes)
    },
    { path: '**', redirectTo: 'errors/404' },
  ];
