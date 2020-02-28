import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Paginated} from '../models/paginated';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {AttemptFilter} from '../models/attempt-filter';
import {Attempt} from '../models/attempt';

@Injectable({
  providedIn: 'root'
})
export class AttemptService {
  constructor(
    private http: HttpClient
  ) { }

  getAttempts(target_id: string, filter?: AttemptFilter): Observable<Paginated<Attempt>> {
    let params = this.filterToParams(filter);
    return this.http.get<Paginated<Attempt>>(`${environment.api_base}/targets/${target_id}/attempts${params}`);
  }

  getAttemptsByPlayer(username: string, filter?: AttemptFilter): Observable<Paginated<Attempt>> {
    let params = this.filterToParams(filter);
    return this.http.get<Paginated<Attempt>>(`${environment.api_base}/players/${username}/attempts${params}`);
  }

  getAttempt(target_id: string, id: string): Observable<Attempt> {
    return this.http.get<any>(`${environment.api_base}/targets/${target_id}/attempts/${id}`)
      .pipe(
        map(response => response.attempt)
      );
  }

  addAttempt(target_id: string, attempt: FormData): Observable<Attempt> {
    return this.http.post<any>(`${environment.api_base}/targets/${target_id}/attempts`, attempt)
      .pipe(
        map(response => response.attempt)
      );
  }

  deleteAttempt(target_id: string, id: string): Observable<any> {
    return this.http.delete(`${environment.api_base}/targets/${target_id}/attempts/${id}`);
  }

  private filterToParams(filter?: AttemptFilter): string {
    let params = new URLSearchParams();
    if (filter) {
      if (filter.sort) params.append('sort', filter.sort);
      if (filter.order) params.append('order', filter.order);
      if (filter.limit) params.append('limit', filter.limit.toString());
      if (filter.page) params.append('page', filter.page.toString());
      if (filter.score) params.append('score', filter.score);
      if (filter.date) params.append('date', filter.date);
    }

    let parsed = params.toString();

    if (parsed) {
      parsed = '?' + parsed;
    }

    return parsed;
  }
}
