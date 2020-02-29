import { Component, OnInit } from '@angular/core';
import {Player} from '../../authentication/player';
import {AuthService} from '../../authentication/auth.service';
import {PlayerService} from '../player.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {PlayerDeleteConfirmComponent} from '../player-delete-confirm/player-delete-confirm.component';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  user: Player;
  player: Player;
  username: string;
  score: number;

  constructor(
    private authService: AuthService,
    private playerService: PlayerService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.player = data.player;
      this.user = data.user;
      this.score = data.score;
    });
  }

  canEdit() {
    return (this.user && this.player && (this.user._id == this.player._id || this.user.isAdmin()));
  }

  deletePlayer() {
    let dialogRef = this.dialog.open(PlayerDeleteConfirmComponent, {
      data: {
        player: this.player
      }
    });

    dialogRef.afterClosed().subscribe(p => {
      if (p) {
        this.playerService.deletePlayer(p.username).subscribe(() => {
          if (this.user && this.user._id == p._id) {
            this.authService.removeJwt();
          }

          this.router.navigate(['/']);
          this.snackBar.open('Speler is verwijderd', null, {
            duration: 5000
          });
        });
      }
    });
  }
}
