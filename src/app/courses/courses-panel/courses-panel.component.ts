import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-courses-panel',
  templateUrl: './courses-panel.component.html',
  styleUrls: ['./courses-panel.component.scss'],
})
export class CoursesPanelComponent implements OnInit {
  @Output() searched = new EventEmitter<string>();

  searchText: string;

  constructor() {}

  ngOnInit() {}

  search(): void {
    this.searched.emit(this.searchText);
  }
}
