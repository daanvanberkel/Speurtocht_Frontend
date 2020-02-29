import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayersRoutingModule } from './players-routing.module';
import {PlayerComponent} from "./player/player.component";
import {EditPlayerComponent} from "./edit-player/edit-player.component";
import {PlayersComponent} from "./players/players.component";
import {PlayerDeleteConfirmComponent} from "./player-delete-confirm/player-delete-confirm.component";
import {PlayerService} from "./player.service";
import {ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {AttemptsModule} from "../attempts/attempts.module";
import {TargetsModule} from "../targets/targets.module";
import {MatDialogModule} from "@angular/material/dialog";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTooltipModule} from "@angular/material/tooltip";


@NgModule({
  declarations: [
    PlayerComponent,
    EditPlayerComponent,
    PlayersComponent,
    PlayerDeleteConfirmComponent
  ],
  imports: [
    CommonModule,
    PlayersRoutingModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    AttemptsModule,
    TargetsModule,
    MatDialogModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatTooltipModule
  ],
  exports: [
    PlayerComponent,
    EditPlayerComponent,
    PlayersComponent,
    PlayerDeleteConfirmComponent
  ]
})
export class PlayersModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: PlayersModule,
      providers: [
        PlayerService
      ]
    }
  }
}
