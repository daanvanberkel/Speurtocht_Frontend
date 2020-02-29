import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttemptsRoutingModule } from './attempts-routing.module';
import {AddAttemptComponent} from "./add-attempt/add-attempt.component";
import {AttemptDeleteConfirmComponent} from "./attempt-delete-confirm/attempt-delete-confirm.component";
import {AttemptDetailDialogComponent} from "./attempt-detail-dialog/attempt-detail-dialog.component";
import {AttemptsComponent} from "./attempts/attempts.component";
import {AttemptService} from "./attempt.service";
import {ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatIconModule} from "@angular/material/icon";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTooltipModule} from "@angular/material/tooltip";


@NgModule({
  declarations: [
    AddAttemptComponent,
    AttemptDeleteConfirmComponent,
    AttemptDetailDialogComponent,
    AttemptsComponent
  ],
  imports: [
    CommonModule,
    AttemptsRoutingModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatPaginatorModule,
    MatTooltipModule
  ],
  exports: [
    AddAttemptComponent,
    AttemptDeleteConfirmComponent,
    AttemptDetailDialogComponent,
    AttemptsComponent
  ]
})
export class AttemptsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AttemptsModule,
      providers: [
        AttemptService
      ]
    }
  }
}
