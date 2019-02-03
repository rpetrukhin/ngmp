import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ROUTES } from 'src/app/consts/routes';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
})
export class LogoComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  goHome(): void {
    this.router.navigate([ROUTES.courses]);
  }
}
