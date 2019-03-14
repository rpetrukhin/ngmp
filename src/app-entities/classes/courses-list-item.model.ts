import { ICoursesListItem } from '../interfaces/courses-list-item.model';
import { Author } from './author.model';

export class CoursesListItem implements ICoursesListItem {
  id: number;
  title: string;
  creationDate: string;
  duration: number;
  description: string;
  topRated: boolean;
  authors: Array<Author>;
}
