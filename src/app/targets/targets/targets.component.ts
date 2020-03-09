import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Target} from '../target';
import {TargetService} from '../target.service';
import {MatPaginator} from '@angular/material/paginator';
import LatLng = google.maps.LatLng;
import {MatSort} from '@angular/material/sort';
import {Player} from '../../authentication/player';
import {AuthService} from '../../authentication/auth.service';
import {MatDialog} from '@angular/material/dialog';
import {TargetDeleteConfirmComponent} from '../target-delete-confirm/target-delete-confirm.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TargetsDataSource} from '../targets.datasource';
import {Router} from '@angular/router';

@Component({
  selector: 'app-targets',
  templateUrl: './targets.component.html',
  styleUrls: ['./targets.component.scss']
})
export class TargetsComponent implements OnInit, OnDestroy {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @Input() user: Player;

  displayedColumns = ['title', 'player', 'thumbs', 'actions'];
  dataSource = new TargetsDataSource(this.targetService);
  userPosition: LatLng;
  player: Player;

  constructor(
    private targetService: TargetService,
    private authService: AuthService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.filter = {
      username: this.user ? this.user.username : ''
    };

    if (this.user) {
      this.displayedColumns.splice(this.displayedColumns.indexOf('player'), 1);
    }

    this.authService.getPlayer().subscribe(player => this.player = player);

    this.targetService.subscribeTargets();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.displayedColumns.splice(this.user ? 2 : 3, 0, 'distance');
        this.userPosition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      });
    }

    this.targetService.getNewTargetsObservable().subscribe(target => {
      this.snackBar.open(`Target ${target.title} is toegevoegd!`, 'Open', {
        duration: 5000
      }).onAction().subscribe(() => {
        this.router.navigate(['/targets', target._id]);
      });
    });

    this.targetService.getChangeTargetsObservable().subscribe(target => {
      this.snackBar.open(`Target ${target.title} is aangepast!`, 'Open', {
        duration: 5000
      }).onAction().subscribe(() => {
        this.router.navigate(['/targets', target._id]);
      });
    });

    this.targetService.getDeleteTargetsObservable().subscribe(target_id => {
      this.snackBar.open(`Er is een target verwijderd.`, 'Refresh', {
        duration: 5000
      }).onAction().subscribe(() => {
        this.dataSource.reset();
      });
    });
  }

  ngOnDestroy(): void {
    this.targetService.unsubscribeTargets();
  }

  getDistance(target: Target): number {
    if (!this.userPosition) {
      return 0;
    }

    return google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(target.location.coordinates[1], target.location.coordinates[0]), this.userPosition);
  }

  deleteTarget(target: Target) {
    let dialogRef = this.dialog.open(TargetDeleteConfirmComponent, {
      data: {
        target
      }
    });

    dialogRef.afterClosed().subscribe(t => {
      if (t) {
        this.targetService.deleteTarget(t._id).subscribe(() => {
          this.dataSource.reset();
          this.snackBar.open('Target is verwijderd', null, {
            duration: 5000
          });
        });
      }
    });
  }
}
