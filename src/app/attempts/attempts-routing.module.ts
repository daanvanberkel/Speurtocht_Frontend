import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AddAttemptComponent} from "./add-attempt/add-attempt.component";
import {AuthGuard} from "../authentication/auth.guard";


const routes: Routes = [
  {
    path: 'targets/:target_id/attempts/add',
    component: AddAttemptComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttemptsRoutingModule { }
