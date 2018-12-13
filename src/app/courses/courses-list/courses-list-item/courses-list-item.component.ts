import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import { CoursesListItem } from 'src/app-entities/classes/courses-list-item.model';

@Component({
  selector: 'app-courses-list-item',
  templateUrl: './courses-list-item.component.html',
  styleUrls: ['./courses-list-item.component.scss'],
})
export class CoursesListItemComponent implements OnInit {
  @Input() course: CoursesListItem;

  @Output() deleted = new EventEmitter<number>();

  editIcon = faEdit;
  deleteIcon = faTrashAlt;

  constructor() {}

  ngOnInit() {}

  deleteCourse() {
    this.deleted.emit(this.course.id);
  }
}
