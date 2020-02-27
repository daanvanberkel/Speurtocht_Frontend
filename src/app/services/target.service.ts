import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TargetFilter} from '../models/target-filter';
import {Observable} from 'rxjs';
import {Target} from '../models/target';
import {environment} from '../../environments/environment';
import {Paginated} from '../models/paginated';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TargetService {

  constructor(
    private http: HttpClient
  ) { }

  getTargets(filter?: TargetFilter): Observable<Paginated<Target>> {
    let params = new URLSearchParams();
    if (filter) {
      if (filter.sort) params.append('sort', filter.sort);
      if (filter.order) params.append('order', filter.order);
      if (filter.limit) params.append('limit', filter.limit.toString());
      if (filter.page) params.append('page', filter.page.toString());
      if (filter.query) params.append('query', filter.query);
      if (filter.lat) params.append('lat', filter.lat.toString());
      if (filter.lng) params.append('lng', filter.lng.toString());
      if (filter.radius) params.append('radius', filter.radius.toString());
    }

    return this.http.get<Paginated<Target>>(`${environment.api_base}/targets?${params.toString()}`);
  }

  getTarget(id: string): Observable<Target> {
    return this.http.get<any>(`${environment.api_base}/targets/${id}`)
      .pipe(
        map(response => new Target(response.target))
      );
  }

  addTarget(target: FormData): Observable<Target> {
    return this.http.post<any>(`${environment.api_base}/targets`, target)
      .pipe(
        map(response => response.target)
      );
  }

  editTarget(id: string, target: Target): Observable<Target> {
    return this.http.put<any>(`${environment.api_base}/targets/${id}`, {
      title: target.title,
      description: target.description,
      lng: target.location.coordinates[0],
      lat: target.location.coordinates[1],
      hint: target.hint
    })
      .pipe(
        map(response => response.target)
      );
  }

  deleteTarget(id: string): Observable<any> {
    return this.http.delete(`${environment.api_base}/targets/${id}`);
  }
}
