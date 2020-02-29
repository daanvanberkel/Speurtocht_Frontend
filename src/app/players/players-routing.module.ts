import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PlayersComponent} from "./players/players.component";
import {PlayerComponent} from "./player/player.component";
import {AuthGuard} from "../authentication/auth.guard";
import {EditPlayerComponent} from "./edit-player/edit-player.component";
import {PlayerDetailResolverService} from "./resolvers/player-detail-resolver.service";
import {UserResolverService} from "../authentication/user-resolver.service";
import {PlayerScoreResolverService} from "./resolvers/player-score-resolver.service";
import {PlayerEditResolverService} from "./resolvers/player-edit-resolver.service";


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: PlayersComponent
      },
      {
        path: ':username',
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            component: PlayerComponent,
            resolve: {
              player: PlayerDetailResolverService,
              user: UserResolverService,
              score: PlayerScoreResolverService
            },
          },
          {
            path: 'edit',
            component: EditPlayerComponent,
            resolve: {
              player: PlayerEditResolverService
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
export class PlayersRoutingModule { }
