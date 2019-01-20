import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  searchCriteria: string;

  constructor() {}

  ngOnInit() {}

  search(searchCriteria: string) {
    this.searchCriteria = searchCriteria;
  }
}
