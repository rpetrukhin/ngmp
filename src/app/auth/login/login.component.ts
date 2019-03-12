import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as AuthAction from '../actions/auth.actions';
import * as fromAuth from '../reducers/auth.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public email: string;
  public password: string;

  public constructor(private store: Store<fromAuth.State>) {}

  public ngOnInit() {}

  public login(): void {
    this.store.dispatch(
      new AuthAction.Login({ login: this.email, password: this.password })
    );
  }
}
