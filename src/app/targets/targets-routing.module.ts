import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TargetsComponent} from "./targets/targets.component";
import {AddTargetComponent} from "./add-target/add-target.component";
import {AuthGuard} from "../authentication/auth.guard";
import {TargetComponent} from "./target/target.component";
import {EditTargetComponent} from "./edit-target/edit-target.component";
import {TargetMapComponent} from "./target-map/target-map.component";
import {TargetDetailResolverService} from "./resolvers/target-detail-resolver.service";
import {TargetEditResolverService} from "./resolvers/target-edit-resolver.service";


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: TargetsComponent
      },
      {
        path: 'map',
        component: TargetMapComponent
      },
      {
        path: 'add',
        component: AddTargetComponent,
        canActivate: [AuthGuard]
      },
      {
        path: ':id',
        children: [
          {
            path: '',
            component: TargetComponent,
            resolve: {
              target: TargetDetailResolverService
            }
          },
          {
            path: 'edit',
            component: EditTargetComponent,
            canActivate: [AuthGuard],
            resolve: {
              target: TargetEditResolverService
            }
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TargetsRoutingModule { }
