import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Player} from "./player";
import {AuthService} from "./auth.service";
import {EMPTY, Observable, of} from "rxjs";
import {mergeMap, take} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserResolverService implements Resolve<Player> {

  constructor(
    private authService: AuthService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Player> | Promise<Player> | Player {
    return this.authService.getPlayer().pipe(
      mergeMap(user => {
        if (user) {
          return of(user);
        }

        return EMPTY;
      }),
      take(1)
    );
  }
}
