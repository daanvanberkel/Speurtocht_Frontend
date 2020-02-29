import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TargetsComponent} from "./targets/targets.component";
import {AddTargetComponent} from "./add-target/add-target.component";
import {AuthGuard} from "../authentication/auth.guard";
import {TargetComponent} from "./target/target.component";
import {EditTargetComponent} from "./edit-target/edit-target.component";


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TargetsRoutingModule { }
