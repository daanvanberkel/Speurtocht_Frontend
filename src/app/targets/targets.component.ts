import {Component, OnInit, ViewChild} from '@angular/core';
import {Target} from '../models/target';
import {TargetService} from '../services/target.service';
import {MatPaginator} from '@angular/material/paginator';
import {BehaviorSubject, Observable} from 'rxjs';
import LatLng = google.maps.LatLng;
import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {MatSort} from '@angular/material/sort';
import {Player} from '../models/player';
import {AuthService} from '../authentication/auth.service';
import {MatDialog} from '@angular/material/dialog';
import {TargetDeleteConfirmComponent} from '../target-delete-confirm/target-delete-confirm.component';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-targets',
  templateUrl: './targets.component.html',
  styleUrls: ['./targets.component.scss']
})
export class TargetsComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  displayedColumns = ['title', 'player', 'thumbs', 'actions'];
  dataSource = new TargetsDataSource(this.targetService);
  userPosition: LatLng;
  player: Player;

  constructor(
    private targetService: TargetService,
    private authService: AuthService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.authService.getPlayer().subscribe(player => this.player = player);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.displayedColumns.splice(3, 0, 'distance');
        this.userPosition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      });
    }
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

class TargetsDataSource extends DataSource<Target> {
  private targets = new BehaviorSubject<Target[]>([]);
  private page = 1;
  private sortBy = 'title';
  private order = 'asc';

  private _sort: MatSort;
  set sort(s) {
    this._sort = s;

    if (s) {
      s.sortChange.asObservable().subscribe(sort => {
        this.sortBy = sort.active;
        this.order = sort.direction;
        this.loadTargets();
      });
    }
  }

  get sort() {
    return this._sort;
  }

  private _paginator: MatPaginator;
  set paginator(p) {
    this._paginator = p;

    if (p) {
      p.page.asObservable().subscribe(pageEvent => {
        this.page = pageEvent.pageIndex + 1;
        this.loadTargets();
      });
    }
  }

  get paginator() {
    return this._paginator;
  }

  constructor(private targetService: TargetService) {
    super();
  }

  loadTargets() {
    this.targetService.getTargets({
      page: this.page,
      sort: this.sortBy,
      order: this.order
    }).subscribe(targets => {
      this.targets.next(targets.docs);
      this._paginator.length = targets.totalDocs;
    });
  }

  connect(collectionViewer: CollectionViewer): Observable<Target[] | ReadonlyArray<Target>> {
    this.loadTargets();

    return this.targets.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
  }

  reset() {
    this.paginator.firstPage();
    this.loadTargets();
  }
}
