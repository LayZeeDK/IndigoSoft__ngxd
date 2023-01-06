import { Route } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export const ROUTES: Route[] = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },

  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('@app/containers/entities/entities.module').then(m => m.EntitiesPageModule),
      },
      {
        path: 'table',
        loadChildren: () =>
          import('@app/containers/table/table.module').then(m => m.TablePageModule),
      },
      {
        path: 'lazy',
        loadChildren: () => import('@app/containers/lazy/lazy.module').then(m => m.LazyPageModule),
      },
      {
        path: 'benchmark',
        loadChildren: () =>
          import('@app/containers/benchmark/benchmark.module').then(m => m.BenchmarkPageModule),
      },
    ],
  },
];
