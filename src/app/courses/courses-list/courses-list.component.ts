import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  OnDestroy,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { CoursesListItem } from 'src/app-entities/classes/courses-list-item.model';
import { CoursesService } from '../courses.service';
import { ROUTES } from 'src/app/consts/routes';

const COURSES_COUNT = 10;

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss'],
})
export class CoursesListComponent implements OnInit, OnChanges, OnDestroy {
  private coursesSubscriptions: Subscription[] = [];
  private currentCoursesCount = 0;

  @Input() public searchCriteria: string;
  public courses: CoursesListItem[] = [];
  public isModalShowed = false;
  public idOfSelectedCourseForDelete: number;
  public couldLoadMore = true;

  public constructor(
    private coursesService: CoursesService,
    private router: Router
  ) {}

  public ngOnInit() {
    this.coursesSubscriptions.push(
      this.coursesService
        .getCourses(0, COURSES_COUNT, this.searchCriteria)
        .subscribe(
          (res: CoursesListItem[]) => {
            this.courses = res;
            this.currentCoursesCount = COURSES_COUNT;
            if (res.length < COURSES_COUNT) {
              this.couldLoadMore = false;
            }
          },
          err => console.log(err.error)
        )
    );
  }

  public ngOnChanges(changes: SimpleChanges) {
    const { currentValue, previousValue } = changes.searchCriteria;
    if (currentValue !== previousValue) {
      this.coursesSubscriptions.push(
        this.coursesService
          .getCourses(0, COURSES_COUNT, currentValue)
          .subscribe(
            (res: CoursesListItem[]) => {
              this.courses = res;
              this.currentCoursesCount = COURSES_COUNT;
              if (res.length < COURSES_COUNT) {
                this.couldLoadMore = false;
              }
            },
            err => console.log(err.error)
          )
      );
    }
  }

  public ngOnDestroy() {
    this.coursesSubscriptions.forEach(coursesSubscription =>
      coursesSubscription.unsubscribe()
    );
  }

  public showModal(id: number): void {
    this.isModalShowed = true;
    this.idOfSelectedCourseForDelete = id;
  }

  public hideModal(): void {
    this.isModalShowed = false;
  }

  public cancelModal(event: MouseEvent): void {
    if ((event.target as any).tagName === 'SECTION') {
      this.hideModal();
    }
  }

  public deleteCourse(): void {
    this.coursesSubscriptions.push(
      this.coursesService
        .deleteCourse(this.idOfSelectedCourseForDelete)
        .subscribe(
          deleteRes => {
            this.coursesSubscriptions.push(
              this.coursesService
                .getCourses(0, COURSES_COUNT, this.searchCriteria)
                .subscribe(
                  (res: CoursesListItem[]) => {
                    this.courses = res;
                    this.currentCoursesCount = COURSES_COUNT;
                    if (res.length < COURSES_COUNT) {
                      this.couldLoadMore = false;
                    }
                  },
                  err => console.log(err.error)
                )
            );
          },
          err => console.log(err)
        )
    );

    this.hideModal();
  }

  public editCourse(id: number): void {
    this.router.navigate([`${ROUTES.courses}/${id}`]);
  }

  public loadMoreCourses(): void {
    if (this.couldLoadMore) {
      this.coursesSubscriptions.push(
        this.coursesService
          .getCourses(
            this.currentCoursesCount,
            COURSES_COUNT,
            this.searchCriteria
          )
          .subscribe(
            (res: CoursesListItem[]) => {
              this.courses = [...this.courses, ...res];
              this.currentCoursesCount += COURSES_COUNT;
              if (res.length < COURSES_COUNT) {
                this.couldLoadMore = false;
              }
            },
            err => console.log(err.error)
          )
      );
    }
  }
}
