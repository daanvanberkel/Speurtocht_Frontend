import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TargetMapComponent} from './targets/target-map/target-map.component';
import {AuthGuard} from './authentication/auth.guard';
import {ProfileComponent} from './profile/profile.component';
import {EditPlayerComponent} from './edit-player/edit-player.component';
import {PlayersComponent} from './players/players.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'map'
  },
  {
    path: 'players',
    component: PlayersComponent
  },
  {
    path: 'players/:username',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'players/:username/edit',
    component: EditPlayerComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'map',
    component: TargetMapComponent
  },
  {
    path: 'auth',
    loadChildren: './authentication/authentication.module#AuthenticationModule'
  },
  {
    path: 'targets',
    loadChildren: './targets/targets.module#TargetsModule'
  },
  {
    path: 'attempts',
    loadChildren: './attempts/attempts.module#AttemptsModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
