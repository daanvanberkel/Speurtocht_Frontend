import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TargetFilter} from './target-filter';
import {Observable} from 'rxjs';
import {Target} from './target';
import {environment} from '../../environments/environment';
import {Paginated} from './paginated';
import {map} from 'rxjs/operators';
import {SocketService} from '../services/socket.service';

@Injectable({
  providedIn: 'root'
})
export class TargetService {

  constructor(
    private http: HttpClient,
    private socketService: SocketService
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
      if (filter.username) params.append('username', filter.username);
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

  subscribeTargets() {
    this.socketService.getSocket().emit('rooms:subscribe:targets');
  }

  subscribeTarget(target_id: string) {
    this.socketService.getSocket().emit('rooms:subscribe:target', {
      target_id
    });
  }

  unsubscribeTargets() {
    this.socketService.getSocket().emit('rooms:unsubscribe:targets');
  }

  unsubscribeTarget(target_id: string) {
    this.socketService.getSocket().emit('rooms:unsubscribe:target', {
      target_id
    });
  }

  getNewTargetsObservable(): Observable<Target> {
    return new Observable<Target>(subscriber => {
      this.socketService.getSocket().on('targets:new', target => {
        subscriber.next(target);
      })
    });
  }

  getChangeTargetsObservable(): Observable<Target> {
    return new Observable<Target>(subscriber => {
      this.socketService.getSocket().on('targets:change', target => {
        subscriber.next(target);
      })
    });
  }

  getDeleteTargetsObservable(): Observable<string> {
    return new Observable<string>(subscriber => {
      this.socketService.getSocket().on('targets:delete', target => {
        subscriber.next(target);
      })
    });
  }
}
