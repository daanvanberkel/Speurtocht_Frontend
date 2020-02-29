import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, Observable} from 'rxjs';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {Injectable} from '@angular/core';
import {Attempt} from './attempt';
import {AttemptService} from './attempt.service';
import {AttemptFilter} from './attempt-filter';

@Injectable()
export class AttemptsDataSource extends DataSource<Attempt> {
  private attempts = new BehaviorSubject<Attempt[]>([]);
  private page = 1;
  private sortBy = 'score';
  private order = 'desc';
  public filter: AttemptFilter;

  private _sort: MatSort;
  set sort(s) {
    this._sort = s;

    if (s) {
      s.sortChange.asObservable().subscribe(sort => {
        this.sortBy = sort.active;
        this.order = sort.direction;
        this.loadAttempts();
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
        this.loadAttempts();
      });
    }
  }

  get paginator() {
    return this._paginator;
  }

  constructor(private attemptService: AttemptService) {
    super();
  }

  loadAttempts() {
    let f = {
      page: this.page,
      sort: this.sortBy,
      order: this.order
    };

    if (this.filter) {
      Object.assign(f, this.filter);
    } else {
      return;
    }

    if (!this.filter.target_id && !this.filter.username) {
      return;
    }

    if (this.filter.target_id) {
      this.attemptService.getAttempts(this.filter.target_id, f).subscribe(attempts => {
        this.attempts.next(attempts.docs);
        this._paginator.length = attempts.totalDocs;
      });
    } else if (this.filter.username) {
      this.attemptService.getAttemptsByPlayer(this.filter.username, f).subscribe(attempts => {
        this.attempts.next(attempts.docs);
        this._paginator.length = attempts.totalDocs;
      });
    }
  }

  connect(collectionViewer: CollectionViewer): Observable<Attempt[] | ReadonlyArray<Attempt>> {
    this.loadAttempts();

    return this.attempts.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
  }

  reset() {
    this.paginator.firstPage();
    this.loadAttempts();
  }
}
