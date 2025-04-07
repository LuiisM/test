import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'features',
    loadChildren: () =>
      import('./features/features.module').then((m) => m.FeaturesModule),
  },
  {
    path: '',
    redirectTo: 'features',
    pathMatch: 'full',
  },
];
