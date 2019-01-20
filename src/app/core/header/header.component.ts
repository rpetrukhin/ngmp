import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from 'src/app/user/user.service';
import { User } from 'src/app-entities/classes/user.model';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  user: User;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.user = this.userService.getUser();
  }

  logout(): void {
    this.authService.logout();
    console.log('logout');
    this.router.navigate(['login']);
  }
}
