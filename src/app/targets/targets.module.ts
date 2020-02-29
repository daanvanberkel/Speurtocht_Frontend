import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

import { TargetsRoutingModule } from './targets-routing.module';
import {AddTargetComponent} from "./add-target/add-target.component";
import {EditTargetComponent} from "./edit-target/edit-target.component";
import {TargetComponent} from "./target/target.component";
import {TargetDeleteConfirmComponent} from "./target-delete-confirm/target-delete-confirm.component";
import {TargetMapComponent} from "./target-map/target-map.component";
import {TargetsComponent} from "./targets/targets.component";
import {HttpClientModule} from "@angular/common/http";
import {TargetService} from "./target.service";
import {MatCardModule} from "@angular/material/card";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatSortModule} from "@angular/material/sort";
import {MatTableModule} from "@angular/material/table";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatIconModule} from "@angular/material/icon";
import {AttemptsModule} from "../attempts/attempts.module";


@NgModule({
  declarations: [
    AddTargetComponent,
    EditTargetComponent,
    TargetComponent,
    TargetDeleteConfirmComponent,
    TargetMapComponent,
    TargetsComponent
  ],
  imports: [
    CommonModule,
    TargetsRoutingModule,
    HttpClientModule,
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSortModule,
    MatTableModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatIconModule,
    AttemptsModule,
  ],
  exports: [
    AddTargetComponent,
    EditTargetComponent,
    TargetComponent,
    TargetDeleteConfirmComponent,
    TargetMapComponent,
    TargetsComponent
  ]
})
export class TargetsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: TargetsModule,
      providers: [
        TargetService
      ]
    }
  }
}
