import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Player} from '../models/player';
import {PlayerFilter} from '../models/player-filter';
import {Paginated} from '../models/paginated';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(
    private http: HttpClient
  ) { }

  getPlayer(username: string): Observable<Player> {
    return this.http.get<any>(`${environment.api_base}/players/${username}`)
      .pipe(
        map(response => new Player(response.player))
      );
  }

  getPlayers(filter?: PlayerFilter): Observable<Paginated<Player>> {
    let params = new URLSearchParams();
    if (filter) {
      if (filter.page) params.append('page', filter.page.toString());
      if (filter.limit) params.append('limit', filter.limit.toString());
      if (filter.sort) params.append('sort', filter.sort);
      if (filter.order) params.append('order', filter.order);
      if (filter.name) params.append('name', filter.name);
      if (filter.username) params.append('username', filter.username);
    }

    return this.http.get<Paginated<Player>>(`${environment.api_base}/players?${params.toString()}`);
  }

  addPlayer(player: Player): Observable<Player> {
    return this.http.post<any>(`${environment.api_base}/players`, {
      name: player.name,
      username: player.username,
      password: player.local && player.local.password ? player.local.password : ''
    })
      .pipe(
        map(response => response.player)
      );
  }

  editPlayer(username: string, player: Player): Observable<Player> {
    return this.http.put<any>(`${environment.api_base}/players/${username}`, {
      name: player.name,
      username: player.username,
      password: player.local && player.local.password ? player.local.password : ''
    })
      .pipe(
        map(response => response.player)
      );
  }

  deletePlayer(username: string): Observable<any> {
    return this.http.delete<any>(`${environment.api_base}/players/${username}`);
  }

  playerScore(username: string): Observable<number> {
    return this.http.get<any>(`${environment.api_base}/players/${username}/score`)
      .pipe(
        map(response => response.score)
      );
  }
}
