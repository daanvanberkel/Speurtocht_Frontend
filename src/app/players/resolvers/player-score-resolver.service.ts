import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {PlayerService} from "../player.service";
import {Observable, of} from "rxjs";
import {mergeMap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PlayerScoreResolverService implements Resolve<number> {

  constructor(
    private playerService: PlayerService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<number> | Promise<number> | number {
    let username = route.paramMap.get('username');

    return this.playerService.playerScore(username).pipe(
      mergeMap(score => {
        if (score) {
          return of(score);
        }

        return of(0);
      })
    )
  }
}
