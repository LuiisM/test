import { Routes } from '@angular/router';
import { DogComponent } from './dog.component';

export const FEATURE_DOG_ROUTES: Routes = [
  {
    path: 'list',
    component: DogComponent,
  },
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
];
