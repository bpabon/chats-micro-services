import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
export const dashboardhRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'chat', pathMatch: 'full' },
      { path: 'chat', loadComponent: () =>
        import('./components/chats/chats.component').then((m) => m.ChatsComponent), },
      { path: '**', redirectTo: 'errors/404' },
    ],
  },
];
