import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from 'src/app/user/user.service';
import { User } from 'src/app-entities/classes/user.model';
import { AuthService } from 'src/app/auth/auth.service';
import { ROUTES } from 'src/app/consts/routes';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  public ngOnInit() {}

  public get user(): User {
    return this.userService.currentUser;
  }

  public get isAuthenticated(): boolean {
    return this.authService.isAuthenticated;
  }

  public logout(): void {
    this.authService.logout();
    this.userService.clearUser();
    this.router.navigate([ROUTES.login]);
  }
}
