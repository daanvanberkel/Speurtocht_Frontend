import { Injectable } from '@angular/core';
import {TargetService} from "../target.service";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Target} from "../target";
import {EMPTY, Observable, of} from "rxjs";
import {mergeMap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TargetDetailResolverService implements Resolve<Target> {

  constructor(
    private targetService: TargetService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Target> | Promise<Target> | Target {
    let id = route.paramMap.get('id');

    return this.targetService.getTarget(id).pipe(
      mergeMap(target => {
        if (target) {
          return of(target);
        }

        return EMPTY;
      })
    );
  }
}
