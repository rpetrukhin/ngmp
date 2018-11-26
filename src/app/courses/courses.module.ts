import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesComponent } from './courses/courses.component';
import { CoursesPanelComponent } from './courses-panel/courses-panel.component';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { CoursesListItemComponent } from './courses-list/courses-list-item/courses-list-item.component';

@NgModule({
  declarations: [
    CoursesComponent,
    CoursesPanelComponent,
    CoursesListComponent,
    CoursesListItemComponent
  ],
  imports: [
    CommonModule
  ],
})
export class CoursesModule { }
