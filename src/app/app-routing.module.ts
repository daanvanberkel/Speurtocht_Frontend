import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TargetMapComponent} from './target-map/target-map.component';
import {TargetComponent} from './target/target.component';
import {AddAttemptComponent} from './add-attempt/add-attempt.component';
import {AuthGuard} from './authentication/auth.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'map'
  },
  {
    path: 'map',
    component: TargetMapComponent
  },
  {
    path: 'targets/:id',
    component: TargetComponent
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
