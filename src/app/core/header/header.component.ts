import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { UserService } from 'src/app/user/user.service';
import { User } from 'src/app-entities/classes/user.model';
import * as fromAuth from 'src/app/auth/reducers/auth.reducer';
import * as AuthAction from 'src/app/auth/actions/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public constructor(
    private userService: UserService,
    private store: Store<fromAuth.State>
  ) {}

  public ngOnInit() {}

  public get user(): User {
    return this.userService.currentUser;
  }

  public get isAuthenticated(): Observable<boolean> {
    return this.store.pipe(select(fromAuth.getIsAuthenticated));
  }

  public logout(): void {
    this.store.dispatch(new AuthAction.Logout());
  }
}
