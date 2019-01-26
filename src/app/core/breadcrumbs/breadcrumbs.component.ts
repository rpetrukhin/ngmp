import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
})
export class BreadcrumbsComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit() {}

  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated;
  }
}
