import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Target} from './target';
import {BehaviorSubject, Observable} from 'rxjs';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {TargetService} from './target.service';
import {Injectable} from '@angular/core';
import {TargetFilter} from './target-filter';

@Injectable()
export class TargetsDataSource extends DataSource<Target> {
  private targets = new BehaviorSubject<Target[]>([]);
  private page = 1;
  private sortBy = 'title';
  private order = 'asc';
  public filter: TargetFilter;

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
    let f = {
      page: this.page,
      sort: this.sortBy,
      order: this.order
    };

    if (this.filter) {
      Object.assign(f, this.filter);
    }

    this.targetService.getTargets(f).subscribe(targets => {
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
