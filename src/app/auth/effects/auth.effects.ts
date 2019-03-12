import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';
import {
  AuthActionTypes,
  Login,
  LoginSuccess,
  LoginFailure,
  Logout,
} from '../actions/auth.actions';
import { UserAuthInfo } from 'src/app-entities/classes/user-auth-info.model';
import { SpinnerService } from 'src/app/spinner/spinner.service';
import { UserService } from 'src/app/user/user.service';
import { ROUTES } from 'src/app/consts/routes';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private spinnerService: SpinnerService,
    private userService: UserService,
    private router: Router
  ) {}

  @Effect()
  login$ = this.actions$.pipe(
    ofType(AuthActionTypes.Login),
    map((action: Login) => action.payload),
    exhaustMap((credentials: UserAuthInfo) => {
      this.spinnerService.numberOfRequests++;
      return this.authService.login(credentials).pipe(
        map((res: LoginResponse) => new LoginSuccess(res)),
        catchError(error => of(new LoginFailure(error)))
      );
    })
  );

  @Effect({ dispatch: false })
  loginSuccess$ = this.actions$.pipe(
    ofType(AuthActionTypes.LoginSuccess),
    map((action: LoginSuccess) => action.payload),
    tap((res: LoginResponse) => {
      localStorage.setItem('token', res.token);
      this.userService.getUser();
      this.router.navigate([ROUTES.courses]);
      setTimeout(() => {
        this.spinnerService.numberOfRequests--;
      }, 700);
    })
  );

  @Effect({ dispatch: false })
  loginFailure$ = this.actions$.pipe(
    ofType(AuthActionTypes.LoginFailure),
    map((action: LoginFailure) => {
      console.log(action.payload);
      setTimeout(() => {
        this.spinnerService.numberOfRequests--;
      }, 700);
    })
  );

  @Effect({ dispatch: false })
  logout$ = this.actions$.pipe(
    ofType(AuthActionTypes.Logout),
    tap((action: Logout) => {
      this.userService.clearUser();
      this.router.navigate([ROUTES.login]);
    })
  );
}
