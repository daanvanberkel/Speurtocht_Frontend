import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Thumb} from './thumb';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ThumbService {

  constructor(
    private http: HttpClient
  ) { }

  getThumbs(target_id: string): Observable<Thumb[]> {
    return this.http.get<any>(`${environment.api_base}/targets/${target_id}/thumbs`)
      .pipe(
        map(response => response.thumbs)
      );
  }

  addThumb(target_id: string, up: boolean): Observable<any> {
    return this.http.post<any>(`${environment.api_base}/targets/${target_id}/thumbs`, {up});
  }

  editThumb(target_id: string, up: boolean): Observable<any> {
    return this.http.put<any>(`${environment.api_base}/targets/${target_id}/thumbs`, {up});
  }

  deleteThumb(target_id: string): Observable<any> {
    return this.http.delete<any>(`${environment.api_base}/targets/${target_id}/thumbs`);
  }
}
