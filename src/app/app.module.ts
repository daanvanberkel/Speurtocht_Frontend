import { BrowserModule } from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import { TargetMapComponent } from './target-map/target-map.component';
import {HttpClientModule} from '@angular/common/http';
import { TargetComponent } from './target/target.component';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTooltipModule} from '@angular/material/tooltip';
import { AttemptDetailDialogComponent } from './attempt-detail-dialog/attempt-detail-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { AttemptDeleteConfirmComponent } from './attempt-delete-confirm/attempt-delete-confirm.component';
import {AuthenticationModule} from './authentication/authentication.module';
import { AddAttemptComponent } from './add-attempt/add-attempt.component';
import {MatBadgeModule} from '@angular/material/badge';
import { AddTargetComponent } from './add-target/add-target.component';
import { TargetsComponent } from './targets/targets.component';
import localeNl from '@angular/common/locales/nl';
import {registerLocaleData} from '@angular/common';
import {MatSortModule} from '@angular/material/sort';
import { EditTargetComponent } from './edit-target/edit-target.component';
import { TargetDeleteConfirmComponent } from './target-delete-confirm/target-delete-confirm.component';

registerLocaleData(localeNl);

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    TargetMapComponent,
    TargetComponent,
    AttemptDetailDialogComponent,
    AttemptDeleteConfirmComponent,
    AddAttemptComponent,
    AddTargetComponent,
    TargetsComponent,
    EditTargetComponent,
    TargetDeleteConfirmComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    HttpClientModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatDialogModule,
    AuthenticationModule.forRoot(),
    MatBadgeModule,
    MatSortModule
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: LOCALE_ID, useValue: 'nl'}
  ]
})
export class AppModule { }
