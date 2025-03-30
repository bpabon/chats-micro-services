import { Routes } from '@angular/router';
import { authRoutes } from './modules/auth/auth.routing';
import { errorRoutes } from './modules/error/error.routing';

export const routes: Routes =  [
    {
      path: 'errors',
      children: errorRoutes
    },
    {
      path: 'auth',
      children: authRoutes, // 🔹 Rutas hijas desde auth.routing.ts
    },{
      path: '',
      loadComponent: () => import('./modules/layout/layout.component').then(r => r.LayoutComponent)
    },
    { path: '**', redirectTo: 'errors/404' },
  ];