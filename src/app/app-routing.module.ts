import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TargetMapComponent} from './target-map/target-map.component';
import {TargetComponent} from './target/target.component';
import {AddAttemptComponent} from './add-attempt/add-attempt.component';
import {AuthGuard} from './authentication/auth.guard';
import {AddTargetComponent} from './add-target/add-target.component';
import {TargetsComponent} from './targets/targets.component';
import {EditTargetComponent} from './edit-target/edit-target.component';
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
    path: 'targets',
    component: TargetsComponent
  },
  {
    path: 'targets/add',
    component: AddTargetComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'targets/:id',
    component: TargetComponent
  },
  {
    path: 'targets/:id/edit',
    component: EditTargetComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'targets/:target_id/attempts/add',
    component: AddAttemptComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'auth',
    loadChildren: './authentication/authentication.module#AuthenticationModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
