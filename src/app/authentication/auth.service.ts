import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Player} from './player';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private player = new BehaviorSubject<Player>(null);

  constructor(
    private http: HttpClient
  ) { }

  login(username: string, password: string): Observable<string> {
    return this.http.post<any>(`${environment.api_base}/auth/local`, {username, password})
      .pipe(
        map(response => response.token)
      );
  }

  getPlayer(): Observable<Player> {
    return this.player.asObservable();
  }

  loadPlayer(): Observable<Player> {
    return this.http.get<any>(`${environment.api_base}/players/@me`)
      .pipe(
        map(response => new Player(response.player)),
        tap(player => this.player.next(player))
      );
  }

  getJwt(): string {
    return localStorage.getItem('jwt');
  }

  setJwt(jwt: string) {
    localStorage.setItem('jwt', jwt);
  }

  removeJwt() {
    this.player.next(null);
    localStorage.removeItem('jwt');
  }
}
