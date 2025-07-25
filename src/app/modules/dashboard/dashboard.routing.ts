import { Routes } from '@angular/router';
import { RenderMode, ServerRoute } from '@angular/ssr';
import { DashboardComponent } from './dashboard.component';
export const authRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
      path: '', redirectTo: 'errors/404', pathMatch: 'full' },
      // {
      //   path: '',
      //   redirectTo: 'sign-in',
      //   pathMatch: 'full',
      // },
      { path: '**', redirectTo: 'errors/404' },
    ],
  },
];
