import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import { ROUTES } from 'src/app/consts/routes';
import * as fromAuth from 'src/app/auth/reducers/auth.reducer';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private store: Store<fromAuth.State>) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.store.pipe(
      select(fromAuth.getIsAuthenticated),
      map(isAuthenticated => {
        if (!isAuthenticated) {
          this.router.navigate([ROUTES.login]);
        }
        return isAuthenticated;
      })
    );
  }
}
