import { Component, OnInit } from '@angular/core';
import {Target} from '../models/target';
import {TargetService} from '../services/target.service';
import {ActivatedRoute} from '@angular/router';
import {Player} from '../models/player';
import {Attempt} from '../models/attempt';
import {AttemptService} from '../services/attempt.service';
import {Paginated} from '../models/paginated';
import {PageEvent} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import {AttemptDetailDialogComponent} from '../attempt-detail-dialog/attempt-detail-dialog.component';
import {AttemptDeleteConfirmComponent} from '../attempt-delete-confirm/attempt-delete-confirm.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AuthService} from '../authentication/auth.service';

@Component({
  selector: 'app-target',
  templateUrl: './target.component.html',
  styleUrls: ['./target.component.scss']
})
export class TargetComponent implements OnInit {

  target: Target;
  player: Player;
  showHint = false;
  attempts: Paginated<Attempt>;
  displayedColumns = ['score', 'player', 'actions'];

  constructor(
    private targetService: TargetService,
    private attemptService: AttemptService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.authService.getPlayer().subscribe(player => {
      this.player = player;
      this.initAttempts();
    });

    this.route.paramMap.subscribe(params => {
      if (params.get('id')) {
        this.targetService.getTarget(params.get('id')).subscribe(target => {
          this.target = target;
          this.initAttempts();
        });
      }
    });
  }

  canEdit(): boolean {
    return this.player && this.target && (this.target.player._id == this.player._id || this.player.isAdmin());
  }

  initAttempts() {
    if (this.attempts) return;

    if (this.canEdit()) {
      this.loadAttempts();
    }
  }

  loadAttempts(pageEvent?: PageEvent) {
    let page = pageEvent ? pageEvent.pageIndex + 1 : 1;
    let limit = 20;

    this.attemptService.getAttempts(this.target._id, {page, limit, sort: 'score', order: 'desc'}).subscribe(attempts => this.attempts = attempts);
  }

  showAttemptDetails(attempt: Attempt) {
    this.dialog.open(AttemptDetailDialogComponent, {
      data: {
        attempt
      }
    });
  }

  deleteAttempt(attempt: Attempt) {
    let dialogRef = this.dialog.open(AttemptDeleteConfirmComponent, {
      data: {
        attempt
      }
    });

    dialogRef.afterClosed().subscribe(attempt => {
      if (attempt) {
        this.attemptService.deleteAttempt(this.target._id, attempt._id).subscribe(() => {
          this.snackBar.open('Poging is verwijderd', null, {
            duration: 5000
          });

          this.loadAttempts();
        }, error => {
          if (error.error.message) {
            this.snackBar.open(error.error.message, null, {
              duration: 5000
            });
          } else {
            this.snackBar.open('Er is een fout opgetreden tijdens het verwijderen van de poging', null, {
              duration: 5000
            });
          }
        });
      }
    });
  }

  toggleHint() {
    this.showHint = !this.showHint;
  }
}
