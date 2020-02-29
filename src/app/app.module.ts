import { BrowserModule } from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {AuthenticationModule} from './authentication/authentication.module';
import localeNl from '@angular/common/locales/nl';
import {registerLocaleData} from '@angular/common';
import {TargetsModule} from "./targets/targets.module";
import {AttemptsModule} from "./attempts/attempts.module";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {MatDividerModule} from "@angular/material/divider";
import {PlayersModule} from "./players/players.module";

registerLocaleData(localeNl);

@NgModule({
  declarations: [
    AppComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    ReactiveFormsModule,
    HttpClientModule,

    // Custom modules
    AuthenticationModule.forRoot(),
    TargetsModule.forRoot(),
    AttemptsModule.forRoot(),
    PlayersModule.forRoot(),

    // Material design
    MatButtonModule,
    MatMenuModule,
    MatDividerModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: LOCALE_ID, useValue: 'nl'}
  ]
})
export class AppModule { }
