import { ICoursesListItem } from '../interfaces/courses-list-item.model';

export class CoursesListItem implements ICoursesListItem {
  id: number;
  title: string;
  creationDate: string;
  duration: number;
  description: string;
  topRated: boolean;
}
