import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';

import { CoursesComponent } from './courses/courses.component';
import { CoursesPanelComponent } from './courses-panel/courses-panel.component';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { CoursesListItemComponent } from './courses-list/courses-list-item/courses-list-item.component';
import { BackgroundColorDirective } from '../common/directives/background-color.directive';
import { DurationPipe } from '../common/pipes/duration.pipe';
import { OrderByCoursesPipe } from '../common/pipes/order-by-courses.pipe';
import { FilterCoursesPipe } from '../common/pipes/filter-courses.pipe';
import { CreateOrEditCourseComponent } from './create-or-edit-course/create-or-edit-course.component';
import { DateInputComponent } from './date-input/date-input.component';
import { DurationInputComponent } from './duration-input/duration-input.component';
import { AuthorsSelectComponent } from './authors-select/authors-select.component';

@NgModule({
  declarations: [
    CoursesComponent,
    CoursesPanelComponent,
    CoursesListComponent,
    CoursesListItemComponent,
    BackgroundColorDirective,
    DurationPipe,
    OrderByCoursesPipe,
    FilterCoursesPipe,
    CreateOrEditCourseComponent,
    DateInputComponent,
    DurationInputComponent,
    AuthorsSelectComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
})
export class CoursesModule {}
