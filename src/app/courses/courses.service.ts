import { Injectable } from '@angular/core';

import { CoursesListItem } from 'src/app-entities/classes/courses-list-item.model';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor() { }

  getCourses(): CoursesListItem[] {
    return [
      {
        id: 1,
        title: 'Video Course 1',
        creationDate: new Date(Date.now()),
        duration: 88,
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat`,
      },
      {
        id: 2,
        title: 'Video Course 2',
        creationDate: new Date(Date.now()),
        duration: 27,
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat`,
      },
    ];
  }
}
