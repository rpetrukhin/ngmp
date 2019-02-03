import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { faEdit, faTrashAlt, faStar } from '@fortawesome/free-solid-svg-icons';

import { CoursesListItem } from 'src/app-entities/classes/courses-list-item.model';

@Component({
  selector: 'app-courses-list-item',
  templateUrl: './courses-list-item.component.html',
  styleUrls: ['./courses-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesListItemComponent implements OnInit {
  @Input() course: CoursesListItem;

  @Output() deleted = new EventEmitter<number>();
  @Output() edited = new EventEmitter<number>();

  editIcon = faEdit;
  deleteIcon = faTrashAlt;
  starIcon = faStar;

  constructor() {}

  ngOnInit() {}

  deleteCourse() {
    this.deleted.emit(this.course.id);
  }

  editCourse() {
    this.edited.emit(this.course.id);
  }
}
