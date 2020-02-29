import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {AuthService} from './auth.service';
import {mergeMap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (!this.authService.getJwt()) {
      localStorage.setItem('redirect_to', state.url);
      this.router.navigate(['/login']);
      return false;
    }

    return this.authService.loadPlayer().pipe(
      mergeMap(player => {
        if (player) {
          return of(true);
        }

        localStorage.setItem('redirect_to', state.url);
        this.router.navigate(['/login']);
        return of(false);
      })
    );
  }
}
