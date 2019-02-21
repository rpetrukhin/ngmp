import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth.service';
import { UserService } from 'src/app/user/user.service';
import { ROUTES } from 'src/app/consts/routes';
import { SpinnerService } from 'src/app/spinner/spinner.service';

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
    private spinnerService: SpinnerService,
    private router: Router
  ) {}

  public ngOnInit() {}

  public ngOnDestroy() {
    this.loginSub.unsubscribe();
  }

  public login(): void {
    this.spinnerService.numberOfRequests++;
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
          setTimeout(() => {
            this.spinnerService.numberOfRequests--;
          }, 700);
        },
        err => {
          console.log(err.error);
          setTimeout(() => {
            this.spinnerService.numberOfRequests--;
          }, 700);
        }
      );
  }
}
