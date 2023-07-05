import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/feature/home.module').then(m => m.HomeModule)
  },
  {
    path: 'play',
    loadChildren: () => import('./game/feature/game.module').then(m => m.GameModule)
  },
  {
    path: 'u',
    loadChildren: () => import('./profile/feature/profile.module').then(m => m.ProfileModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
