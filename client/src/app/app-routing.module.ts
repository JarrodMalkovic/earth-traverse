import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./home/feature/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/feature/auth-shell/auth-shell.module').then(
        (m) => m.AuthShellModule
      ),
  },
  {
    path: 'leaderboard',
    loadChildren: () =>
      import('./home/feature/leaderboard/leaderboard.module').then(
        (m) => m.HomeModule
      ),
  },
  {
    path: 'play/:id',
    loadChildren: () =>
      import('./game/feature/game.module').then((m) => m.GameModule),
  },
  {
    path: 'u/:username',
    loadChildren: () =>
      import('./profile/feature/profile.module').then((m) => m.ProfileModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
