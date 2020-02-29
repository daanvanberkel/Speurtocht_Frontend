import { Component, OnInit } from '@angular/core';
import {Target} from '../target';
import {TargetService} from '../target.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Player} from '../../authentication/player';
import {AttemptService} from '../../attempts/attempt.service';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AuthService} from '../../authentication/auth.service';
import {TargetDeleteConfirmComponent} from '../target-delete-confirm/target-delete-confirm.component';

@Component({
  selector: 'app-target',
  templateUrl: './target.component.html',
  styleUrls: ['./target.component.scss']
})
export class TargetComponent implements OnInit {

  target: Target;
  player: Player;
  showHint = false;

  constructor(
    private targetService: TargetService,
    private attemptService: AttemptService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authService.getPlayer().subscribe(player => {
      this.player = player;
    });

    this.route.data.subscribe(data => {
      this.target = data.target;
    });
  }

  canEdit(): boolean {
    return this.player && this.target && (this.target.player._id == this.player._id || this.player.isAdmin());
  }

  deleteTarget() {
    let dialogRef = this.dialog.open(TargetDeleteConfirmComponent, {
      data: {
        target: this.target
      }
    });

    dialogRef.afterClosed().subscribe(t => {
      if (t) {
        this.targetService.deleteTarget(t._id).subscribe(() => {
          this.router.navigate(['/targets']);
          this.snackBar.open('Target is verwijderd', null, {
            duration: 5000
          });
        });
      }
    });
  }

  toggleHint() {
    this.showHint = !this.showHint;
  }
}
