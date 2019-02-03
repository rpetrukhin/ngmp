import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { ROUTES } from 'src/app/consts/routes';

@Component({
  selector: 'app-courses-panel',
  templateUrl: './courses-panel.component.html',
  styleUrls: ['./courses-panel.component.scss'],
})
export class CoursesPanelComponent implements OnInit {
  @Output() searched = new EventEmitter<string>();

  searchText: string;

  constructor(private router: Router) {}

  ngOnInit() {}

  search(): void {
    this.searched.emit(this.searchText);
  }

  addCourse() {
    this.router.navigate([ROUTES.addCourse]);
  }
}
