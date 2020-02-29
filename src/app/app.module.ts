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
import {HttpClientModule} from '@angular/common/http';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDialogModule} from '@angular/material/dialog';
import {AuthenticationModule} from './authentication/authentication.module';
import {MatBadgeModule} from '@angular/material/badge';
import localeNl from '@angular/common/locales/nl';
import {registerLocaleData} from '@angular/common';
import {MatSortModule} from '@angular/material/sort';
import { ProfileComponent } from './profile/profile.component';
import { EditPlayerComponent } from './edit-player/edit-player.component';
import {PlayerDeleteConfirmComponent} from './player-delete-confirm/player-delete-confirm.component';
import { PlayersComponent } from './players/players.component';
import {TargetsModule} from "./targets/targets.module";
import {AttemptsModule} from "./attempts/attempts.module";

registerLocaleData(localeNl);

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    ProfileComponent,
    EditPlayerComponent,
    PlayerDeleteConfirmComponent,
    PlayersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    ReactiveFormsModule,

    // Material design
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
    MatBadgeModule,
    MatSortModule,

    // Custom modules
    AuthenticationModule.forRoot(),
    TargetsModule.forRoot(),
    AttemptsModule.forRoot(),
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: LOCALE_ID, useValue: 'nl'}
  ]
})
export class AppModule { }
