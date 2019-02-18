import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { ROUTES } from 'src/app/consts/routes';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  login(): void {
    this.authService.login({
      email: this.email,
      password: this.password,
    });
    console.log('‘logged in successfully');
    this.router.navigate([ROUTES.courses]);
  }
}
