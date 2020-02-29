import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThumbsComponent } from './thumbs/thumbs.component';
import {MatIconModule} from '@angular/material/icon';
import {HttpClientModule} from '@angular/common/http';



@NgModule({
  declarations: [ThumbsComponent],
  imports: [
    CommonModule,
    MatIconModule,
    HttpClientModule
  ],
  exports: [ThumbsComponent]
})
export class ThumbsModule { }
