import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/auth/auth.service';
import { CoursesService } from 'src/app/courses/courses.service';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {
  courseName: string;
  routeSub: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private coursesService: CoursesService
  ) {}

  ngOnInit() {
    this.routeSub = this.router.events.subscribe(event =>
      this.setCourseName(event)
    );
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated;
  }

  setCourseName(event: Event) {
    if (!(event instanceof NavigationEnd)) {
      return;
    }
    const paramAfterCourses = event.url.split('/')[2];
    if (Number(paramAfterCourses)) {
      this.courseName = `/${
        this.coursesService.getCourse(Number(paramAfterCourses)).title
      }`;
    } else if (paramAfterCourses === 'new') {
      this.courseName = '/new';
    } else {
      this.courseName = '';
    }
  }
}
