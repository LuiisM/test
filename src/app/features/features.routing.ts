import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'dogs',
    loadChildren: () => import('./dog').then((m) => m.FEATURE_DOG_ROUTES),
  },
  {
    path: '',
    redirectTo: 'dogs',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeaturesRoutingModule {}
