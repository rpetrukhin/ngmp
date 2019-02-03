import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoursesComponent } from './courses/courses/courses.component';
import { LoginComponent } from './auth/login/login.component';
import { CreateOrEditCourseComponent } from './courses/create-or-edit-course/create-or-edit-course.component';

const routes: Routes = [
  { path: 'courses', component: CoursesComponent },
  { path: 'login', component: LoginComponent },
  { path: 'add-course', component: CreateOrEditCourseComponent },
  { path: 'edit-course/:id', component: CreateOrEditCourseComponent },
  { path: '**', redirectTo: '/courses' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
