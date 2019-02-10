import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/auth/auth.service';
import { CoursesService } from 'src/app/courses/courses.service';
import { CoursesListItem } from 'src/app-entities/classes/courses-list-item.model';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {
  private routeSub: Subscription;
  private courseSub: Subscription;

  public courseName: string;

  public constructor(
    private authService: AuthService,
    private router: Router,
    private coursesService: CoursesService
  ) {}

  public ngOnInit() {
    this.routeSub = this.router.events.subscribe(event =>
      this.setCourseName(event)
    );
  }

  public ngOnDestroy() {
    this.routeSub.unsubscribe();
    this.courseSub.unsubscribe();
  }

  public get isAuthenticated(): boolean {
    return this.authService.isAuthenticated;
  }

  public setCourseName(event: Event) {
    if (!(event instanceof NavigationEnd)) {
      return;
    }
    const paramAfterCourses = event.url.split('/')[2];
    if (Number(paramAfterCourses)) {
      this.courseSub = this.coursesService
        .getCourse(Number(paramAfterCourses))
        .subscribe((res: CoursesListItem) => {
          this.courseName = `/${res.title}`;
        });
    } else if (paramAfterCourses === 'new') {
      this.courseName = '/new';
    } else {
      this.courseName = '';
    }
  }
}
