import { Pipe, PipeTransform } from '@angular/core';

import { CoursesListItem } from 'src/app-entities/classes/courses-list-item.model';

@Pipe({
  name: 'filterCourses',
})
export class FilterCoursesPipe implements PipeTransform {
  transform(
    courses: Array<CoursesListItem>,
    searchCriteria: string
  ): Array<CoursesListItem> {
    if (searchCriteria) {
      return courses.filter(
        course =>
          course.title.toLowerCase().search(searchCriteria.toLowerCase()) > -1
      );
    } else {
      return courses.slice();
    }
  }
}
