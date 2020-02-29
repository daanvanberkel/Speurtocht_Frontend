import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from "@angular/router";
import {Player} from "../../authentication/player";
import {EMPTY, Observable, of} from "rxjs";
import {PlayerService} from "../player.service";
import {mergeMap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PlayerDetailResolverService implements Resolve<Player> {

  constructor(
    private playerService: PlayerService,
    private router: Router
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Player> | Promise<Player> | Player {
    let username = route.paramMap.get('username');

    return this.playerService.getPlayer(username).pipe(
      mergeMap(player => {
        if (player) {
          return of(player);
        }

        this.router.navigate(['/players']);
        return EMPTY;
      })
    );
  }
}
