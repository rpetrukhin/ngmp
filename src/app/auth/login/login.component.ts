import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormGroup, FormControl } from '@angular/forms';

import * as AuthAction from '../actions/auth.actions';
import * as fromAuth from '../reducers/auth.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginControl: FormGroup;

  public constructor(private store: Store<fromAuth.State>) {}

  public ngOnInit() {
    this.loginControl = new FormGroup({
      email: new FormControl(null),
      password: new FormControl(null),
    });
  }

  public login(): void {
    this.store.dispatch(
      new AuthAction.Login({
        login: this.loginControl.value.email,
        password: this.loginControl.value.password,
      })
    );
  }
}
