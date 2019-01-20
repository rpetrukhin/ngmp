import { Injectable } from '@angular/core';

import { CoursesListItem } from 'src/app-entities/classes/courses-list-item.model';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  courses: CoursesListItem[] = [
    {
      id: 1,
      title: 'Angular',
      creationDate: new Date(2018, 11, 16),
      duration: 88,
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat`,
      topRated: true,
    },
    {
      id: 2,
      title: 'React',
      creationDate: new Date(2019, 0, 1),
      duration: 27,
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat`,
      topRated: false,
    },
    {
      id: 3,
      title: 'Vue',
      creationDate: new Date(2017, 4, 25),
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

  deleteCourse(id: number): void {
    this.courses = this.courses.filter(course => course.id !== id);
  }
}
