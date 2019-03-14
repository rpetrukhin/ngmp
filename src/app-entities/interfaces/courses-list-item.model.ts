import { IAuthor } from './author.model';

export interface ICoursesListItem {
  id: number;
  title: string;
  creationDate: string;
  duration: number;
  description: string;
  topRated: boolean;
  authors: Array<IAuthor>;
}
