import { Injectable } from '@angular/core';
import * as moment from 'moment';

import { CoursesListItem } from 'src/app-entities/classes/courses-list-item.model';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  courses: CoursesListItem[] = [
    {
      id: 1,
      title: 'Angular',
      creationDate: moment()
        .subtract(7, 'days')
        .toDate(),
      duration: 88,
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat`,
      topRated: true,
    },
    {
      id: 2,
      title: 'React',
      creationDate: moment()
        .add(14, 'days')
        .toDate(),
      duration: 27,
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat`,
      topRated: false,
    },
    {
      id: 3,
      title: 'Vue',
      creationDate: moment()
        .subtract(2, 'months')
        .toDate(),
      duration: 344,
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat`,
      topRated: false,
    },
  ];

  constructor() {}

  getCourses(): CoursesListItem[] {
    return this.courses;
  }

  getCourse(id: number): CoursesListItem {
    return this.courses.filter(course => course.id === id)[0];
  }

  createCourse(course: CoursesListItem): void {
    this.courses.push(course);
  }

  updateCourse(updatedCourse: CoursesListItem): void {
    this.courses = this.courses.map(course => {
      if (course.id === updatedCourse.id) {
        return updatedCourse;
      } else {
        return course;
      }
    });
  }

  deleteCourse(id: number): void {
    this.courses = this.courses.filter(course => course.id !== id);
  }
}
