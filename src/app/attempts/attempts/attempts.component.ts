import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Target} from '../../targets/target';
import {Player} from '../../authentication/player';
import {AttemptsDataSource} from '../attempts.datasource';
import {AttemptService} from '../attempt.service';
import {Attempt} from '../attempt';
import {AttemptDetailDialogComponent} from '../attempt-detail-dialog/attempt-detail-dialog.component';
import {AttemptDeleteConfirmComponent} from '../attempt-delete-confirm/attempt-delete-confirm.component';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-attempts',
  templateUrl: './attempts.component.html',
  styleUrls: ['./attempts.component.scss'],
  inputs: [
    'target',
    'player'
  ]
})
export class AttemptsComponent implements OnInit, OnDestroy {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @Input() target?: Target;
  @Input() player?: Player;
  dataSource = new AttemptsDataSource(this.attemptService);
  displayedColumns = ['score', 'player', 'actions'];

  constructor(
    private attemptService: AttemptService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    if (this.player) {
      this.displayedColumns.splice(2, 0, 'target');
    }

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.dataSource.filter = {
      username: this.player ? this.player.username : undefined,
      target_id: this.target ? this.target._id : undefined
    };

    if (this.target) {
      this.attemptService.subscribeAttempts(this.target._id);

      this.attemptService.getNewAttemptsObservable().subscribe(attempt => {
        if (attempt.target._id != this.target._id) {
          return;
        }

        this.snackBar.open(`Er is een nieuwe poging van ${attempt.player.name} toegevoegd met score ${attempt.score}.`, 'Refresh', {
          duration: 5000
        }).onAction().subscribe(() => {
          this.dataSource.reset();
        });
      });

      this.attemptService.getDeletedAttemptsObservable().subscribe(attempt_id => {
        this.snackBar.open('Er is een poging verwijderd', 'Refresh', {
          duration: 5000
        }).onAction().subscribe(() => {
          this.dataSource.reset();
        });
      });
    }
  }

  ngOnDestroy(): void {
    if (this.target) {
      this.attemptService.unsubscribeAttempts(this.target._id);
    }
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
        this.attemptService.deleteAttempt(attempt.target._id, attempt._id).subscribe(() => {
          this.snackBar.open('Poging is verwijderd', null, {
            duration: 5000
          });

          this.dataSource.reset();
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
}
