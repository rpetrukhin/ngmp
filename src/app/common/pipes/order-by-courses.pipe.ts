import { Pipe, PipeTransform } from '@angular/core';

import { CoursesListItem } from 'src/app-entities/classes/courses-list-item.model';

@Pipe({
  name: 'orderByCourses',
})
export class OrderByCoursesPipe implements PipeTransform {
  transform(courses: Array<CoursesListItem>): Array<CoursesListItem> {
    return courses.sort(
      (a, b) =>
        new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime()
    );
  }
}
