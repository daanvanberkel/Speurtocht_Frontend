import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from "@angular/router";
import {Player} from "../../authentication/player";
import {EMPTY, Observable, of} from "rxjs";
import {PlayerService} from "../player.service";
import {mergeMap} from "rxjs/operators";
import {AuthService} from "../../authentication/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class PlayerEditResolverService implements Resolve<Player> {

  constructor(
    private playerService: PlayerService,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Player> | Promise<Player> | Player {
    let username = route.paramMap.get('username');
    let user = this.authService.player.getValue();

    return this.playerService.getPlayer(username).pipe(
      mergeMap(player => {
        if (player) {
          if (player._id != user._id && !user.isAdmin()) {
            this.snackBar.open('U kunt deze speler niet aanpassen', null, {
              duration: 5000
            });
            this.router.navigate(['/players', username]);
            return EMPTY;
          }

          return of(player);
        }

        this.router.navigate(['/players', username]);
        return EMPTY;
      })
    );
  }
}
