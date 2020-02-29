import { Injectable } from '@angular/core';
import {TargetService} from "../target.service";
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from "@angular/router";
import {Target} from "../target";
import {EMPTY, Observable, of} from "rxjs";
import {mergeMap} from "rxjs/operators";
import {AuthService} from "../../authentication/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class TargetEditResolverService implements Resolve<Target> {

  constructor(
    private targetService: TargetService,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Target> | Promise<Target> | Target {
    let id = route.paramMap.get('id');
    let user = this.authService.player.getValue();

    return this.targetService.getTarget(id).pipe(
      mergeMap(target => {
        if (target) {
          if (target.player._id != user._id && !user.isAdmin()) {
            this.snackBar.open('U kunt dit target niet aanpassen', null, {
              duration: 5000
            });
            this.router.navigate(['/targets', id]);

            return EMPTY;
          }

          return of(target);
        }

        return EMPTY;
      })
    );
  }
}
