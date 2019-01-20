import { ICoursesListItem } from '../interfaces/courses-list-item.model';

export class CoursesListItem implements ICoursesListItem {
  id: number;
  title: string;
  creationDate: Date;
  duration: number;
  description: string;
  topRated: boolean;
}
