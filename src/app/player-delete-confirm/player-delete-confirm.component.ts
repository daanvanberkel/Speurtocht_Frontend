import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Player} from '../models/player';

@Component({
  selector: 'app-player-delete-confirm',
  templateUrl: './player-delete-confirm.component.html',
  styleUrls: ['./player-delete-confirm.component.scss']
})
export class PlayerDeleteConfirmComponent implements OnInit {

  player: Player;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any
  ) { }

  ngOnInit(): void {
    this.player = this.data.player;
  }
}
