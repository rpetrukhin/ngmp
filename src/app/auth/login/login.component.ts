import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth.service';
import { UserService } from 'src/app/user/user.service';
import { ROUTES } from 'src/app/consts/routes';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  private loginSub: Subscription;

  public email: string;
  public password: string;

  public constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  public ngOnInit() {}

  public ngOnDestroy() {
    this.loginSub.unsubscribe();
  }

  public login(): void {
    this.loginSub = this.authService
      .login({
        login: this.email,
        password: this.password,
      })
      .subscribe(
        (res: LoginResponse) => {
          localStorage.setItem('token', res.token);
          this.authService.isAuthenticated = true;
          this.userService.getUser();
          this.router.navigate([ROUTES.courses]);
        },
        err => {
          console.log(err.error);
        }
      );
  }
}
