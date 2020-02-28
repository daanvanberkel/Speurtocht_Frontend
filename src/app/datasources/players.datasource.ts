import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, Observable} from 'rxjs';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {Injectable} from '@angular/core';
import {Player} from '../models/player';
import {PlayerService} from '../services/player.service';

@Injectable()
export class PlayersDataSource extends DataSource<Player> {
  private players = new BehaviorSubject<Player[]>([]);
  private page = 1;
  private sortBy = 'score';
  private order = 'desc';

  private _sort: MatSort;
  set sort(s) {
    this._sort = s;

    if (s) {
      s.sortChange.asObservable().subscribe(sort => {
        this.sortBy = sort.active;
        this.order = sort.direction;
        this.loadPlayers();
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
        this.loadPlayers();
      });
    }
  }

  get paginator() {
    return this._paginator;
  }

  constructor(private playerService: PlayerService) {
    super();
  }

  loadPlayers() {
    let f = {
      page: this.page,
      sort: this.sortBy,
      order: this.order
    };

    this.playerService.getPlayers(f).subscribe(players => {
      this.players.next(players.docs);
      this._paginator.length = players.totalDocs;
    });
  }

  connect(collectionViewer: CollectionViewer): Observable<Player[] | ReadonlyArray<Player>> {
    this.loadPlayers();

    return this.players.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
  }

  reset() {
    this.paginator.firstPage();
    this.loadPlayers();
  }
}
