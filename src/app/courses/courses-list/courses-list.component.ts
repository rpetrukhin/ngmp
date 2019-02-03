import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';

import { CoursesListItem } from 'src/app-entities/classes/courses-list-item.model';
import { CoursesService } from '../courses.service';
import { FilterCoursesPipe } from 'src/app/common/pipes/filter-courses.pipe';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss'],
  providers: [FilterCoursesPipe],
})
export class CoursesListComponent implements OnInit, OnChanges {
  @Input() searchCriteria: string;

  courses: CoursesListItem[] = [];
  filteredCourses: CoursesListItem[] = [];

  isModalShowed = false;
  idOfSelectedCourseForDelete: number;

  constructor(
    private coursesService: CoursesService,
    private filterCourses: FilterCoursesPipe,
    private router: Router
  ) {}

  ngOnInit() {
    this.courses = this.coursesService.getCourses();
    this.filteredCourses = this.filterCourses.transform(
      this.courses,
      this.searchCriteria
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    const { currentValue, previousValue } = changes.searchCriteria;
    if (currentValue !== previousValue) {
      this.filteredCourses = this.filterCourses.transform(
        this.courses,
        currentValue
      );
    }
  }

  showModal(id: number): void {
    this.isModalShowed = true;
    this.idOfSelectedCourseForDelete = id;
  }

  hideModal(): void {
    this.isModalShowed = false;
  }

  cancelModal(event: MouseEvent): void {
    if ((event.target as any).tagName === 'SECTION') {
      this.hideModal();
    }
  }

  deleteCourse(): void {
    this.coursesService.deleteCourse(this.idOfSelectedCourseForDelete);

    this.courses = this.coursesService.getCourses();
    this.filteredCourses = this.filterCourses.transform(
      this.courses,
      this.searchCriteria
    );

    this.hideModal();
  }

  editCourse(id: number): void {
    this.router.navigate([`edit-course/${id}`]);
  }

  loadMoreCourses(): void {
    console.log('Load more');
  }
}
