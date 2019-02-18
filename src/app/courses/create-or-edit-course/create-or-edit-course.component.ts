import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import * as moment from 'moment';

import { CoursesService } from '../courses.service';
import { CoursesListItem } from 'src/app-entities/classes/courses-list-item.model';
import { ROUTES } from 'src/app/consts/routes';

@Component({
  selector: 'app-create-or-edit-course',
  templateUrl: './create-or-edit-course.component.html',
  styleUrls: ['./create-or-edit-course.component.scss'],
})
export class CreateOrEditCourseComponent implements OnInit, OnDestroy {
  private routeSub: Subscription;
  private course: CoursesListItem = null;

  public title: string;
  public description: string;
  public date: string;
  public duration: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private coursesService: CoursesService
  ) {}

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      if (params.id) {
        this.course = this.coursesService
          .getCourses()
          .find(el => el.id === Number(params.id));

        this.title = this.course.title;
        this.description = this.course.description;
        this.date = moment(this.course.creationDate).format('YYYY-MM-DD');
        this.duration = this.course.duration;
      }
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  save() {
    if (this.course) {
      this.coursesService.updateCourse({
        ...this.course,
        title: this.title,
        description: this.description,
        creationDate: moment(this.date).toDate(),
        duration: this.duration,
      });
    } else {
      this.coursesService.createCourse({
        id: Date.now(),
        title: this.title,
        description: this.description,
        creationDate: moment(this.date).toDate(),
        duration: this.duration,
        topRated: false,
      });
    }
    this.router.navigate([ROUTES.courses]);
  }

  cancel(): void {
    this.router.navigate([ROUTES.courses]);
  }
}
