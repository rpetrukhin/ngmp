import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-courses-panel',
  templateUrl: './courses-panel.component.html',
  styleUrls: ['./courses-panel.component.scss'],
})
export class CoursesPanelComponent implements OnInit {
  searchText: string;

  constructor() {}

  ngOnInit() {}

  search(): void {
    console.log(this.searchText);
  }
}
