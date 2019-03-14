import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Subscription } from 'rxjs';
import * as moment from 'moment';

import { CoursesService } from '../courses.service';
import { CoursesListItem } from 'src/app-entities/classes/courses-list-item.model';
import { ROUTES } from 'src/app/consts/routes';
import { SpinnerService } from 'src/app/spinner/spinner.service';
import { Author } from 'src/app-entities/classes/author.model';

@Component({
  selector: 'app-create-or-edit-course',
  templateUrl: './create-or-edit-course.component.html',
  styleUrls: ['./create-or-edit-course.component.scss'],
})
export class CreateOrEditCourseComponent implements OnInit, OnDestroy {
  private routeSub: Subscription;
  private course: CoursesListItem = null;

  public courseControl: FormGroup;
  public listOfAuthors: Array<Author>;

  public constructor(
    private route: ActivatedRoute,
    private router: Router,
    private coursesService: CoursesService,
    private spinnerService: SpinnerService
  ) {}

  public ngOnInit() {
    this.courseControl = new FormGroup({
      title: new FormControl(null, Validators.maxLength(50)),
      description: new FormControl(null, Validators.maxLength(500)),
      date: new FormControl(null),
      duration: new FormControl(null),
      authors: new FormControl(null),
    });

    this.routeSub = this.route.params.subscribe(params => {
      if (params.id) {
        this.spinnerService.numberOfRequests++;
        this.coursesService
          .getCourse(Number(params.id))
          .subscribe((res: CoursesListItem) => {
            this.course = res;
            this.courseControl.setValue({
              title: this.course.title,
              description: this.course.description,
              date: moment(this.course.creationDate).format('YYYY-MM-DD'),
              duration: this.course.duration,
              authors: JSON.stringify(this.course.authors),
            });
            setTimeout(() => {
              this.spinnerService.numberOfRequests--;
            }, 700);
          });
      }
    });

    this.spinnerService.numberOfRequests++;
    this.coursesService.getAuthors().subscribe(
      (res: Array<Author>) => {
        this.listOfAuthors = res;
      },
      err => {
        console.log(err);
      },
      () => {
        setTimeout(() => {
          this.spinnerService.numberOfRequests--;
        }, 700);
      }
    );
  }

  public ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  public save() {
    this.spinnerService.numberOfRequests++;
    if (this.course) {
      this.coursesService
        .updateCourse({
          ...this.course,
          title: this.courseControl.value.title,
          description: this.courseControl.value.description,
          creationDate: moment(this.courseControl.value.date).format(
            'YYYY-MM-DDTHH:MM:SSZ'
          ),
          duration: this.courseControl.value.duration,
          authors: JSON.parse(this.courseControl.value.authors),
        })
        .subscribe(
          res => {
            this.router.navigate([ROUTES.courses]);
            setTimeout(() => {
              this.spinnerService.numberOfRequests--;
            }, 700);
          },
          err => {
            console.log(err);
            setTimeout(() => {
              this.spinnerService.numberOfRequests--;
            }, 700);
          }
        );
    } else {
      this.coursesService
        .createCourse({
          id: Date.now(),
          title: this.courseControl.value.title,
          description: this.courseControl.value.description,
          creationDate: moment(this.courseControl.value.date).format(
            'YYYY-MM-DDTHH:MM:SSZ'
          ),
          duration: this.courseControl.value.duration,
          topRated: false,
          authors: JSON.parse(this.courseControl.value.authors),
        })
        .subscribe(
          res => {
            this.router.navigate([ROUTES.courses]);
            setTimeout(() => {
              this.spinnerService.numberOfRequests--;
            }, 700);
          },
          err => {
            console.log(err);
            setTimeout(() => {
              this.spinnerService.numberOfRequests--;
            }, 700);
          }
        );
    }
  }

  public cancel(): void {
    this.router.navigate([ROUTES.courses]);
  }
}
