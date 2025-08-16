import { Routes } from '@angular/router';
import { UikitComponent } from './uikit.component';
export const uikitRoutes: Routes = [
  {
    path: '',
    component: UikitComponent,
    children: [
      { path: '', redirectTo: 'components', pathMatch: 'full' },
      { path: 'table', loadComponent: () =>
        import('./pages/table/table.component').then((m) => m.TableComponent), },
      { path: '**', redirectTo: 'errors/404' },
    ],
  },
];
