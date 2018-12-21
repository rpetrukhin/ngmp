import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { CoursesComponent } from './courses/courses.component';
import { CoursesPanelComponent } from './courses-panel/courses-panel.component';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { CoursesListItemComponent } from './courses-list/courses-list-item/courses-list-item.component';
import { BackgroundColorDirective } from '../common/directives/background-color.directive';
import { DurationPipe } from '../common/pipes/duration.pipe';
import { OrderByCoursesPipe } from '../common/pipes/order-by-courses.pipe';

@NgModule({
  declarations: [
    CoursesComponent,
    CoursesPanelComponent,
    CoursesListComponent,
    CoursesListItemComponent,
    BackgroundColorDirective,
    DurationPipe,
    OrderByCoursesPipe,
  ],
  imports: [CommonModule, FormsModule, FontAwesomeModule],
})
export class CoursesModule {}
