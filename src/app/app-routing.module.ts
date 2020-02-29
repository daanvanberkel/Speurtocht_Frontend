import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'targets/map'
  },
  {
    path: 'auth',
    loadChildren: () => import('./authentication/authentication.module').then(mod => mod.AuthenticationModule)
  },
  {
    path: 'targets',
    loadChildren: () => import('./targets/targets.module').then(mod => mod.TargetsModule)
  },
  {
    path: 'attempts',
    loadChildren: () => import('./attempts/attempts.module').then(mod => mod.AttemptsModule)
  },
  {
    path: 'players',
    loadChildren: () => import('./players/players.module').then(mod => mod.PlayersModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
