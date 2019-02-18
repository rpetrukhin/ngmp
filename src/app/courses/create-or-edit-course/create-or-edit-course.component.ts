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
  private courseSubs: Subscription[] = [];
  private course: CoursesListItem = null;

  public title: string;
  public description: string;
  public date: string;
  public duration: number;

  public constructor(
    private route: ActivatedRoute,
    private router: Router,
    private coursesService: CoursesService
  ) {}

  public ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      if (params.id) {
        this.courseSubs.push(
          this.coursesService
            .getCourse(Number(params.id))
            .subscribe((res: CoursesListItem) => {
              this.course = res;
              this.title = this.course.title;
              this.description = this.course.description;
              this.date = moment(this.course.creationDate).format('YYYY-MM-DD');
              this.duration = this.course.duration;
            })
        );
      }
    });
  }

  public ngOnDestroy() {
    this.routeSub.unsubscribe();
    this.courseSubs.forEach(courseSub => courseSub.unsubscribe());
  }

  public save() {
    if (this.course) {
      this.courseSubs.push(
        this.coursesService
          .updateCourse({
            ...this.course,
            title: this.title,
            description: this.description,
            creationDate: moment(this.date).format('YYYY-MM-DDTHH:MM:SSZ'),
            duration: this.duration,
          })
          .subscribe(
            res => {
              this.router.navigate([ROUTES.courses]);
            },
            err => console.log(err)
          )
      );
    } else {
      this.courseSubs.push(
        this.coursesService
          .createCourse({
            id: Date.now(),
            title: this.title,
            description: this.description,
            creationDate: moment(this.date).format('YYYY-MM-DDTHH:MM:SSZ'),
            duration: this.duration,
            topRated: false,
          })
          .subscribe(
            res => {
              this.router.navigate([ROUTES.courses]);
            },
            err => console.log(err)
          )
      );
    }
  }

  public cancel(): void {
    this.router.navigate([ROUTES.courses]);
  }
}
