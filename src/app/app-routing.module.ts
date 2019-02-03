import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoursesComponent } from './courses/courses/courses.component';
import { LoginComponent } from './auth/login/login.component';
import { CreateOrEditCourseComponent } from './courses/create-or-edit-course/create-or-edit-course.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ROUTES } from './consts/routes';
import { AuthGuard } from './common/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: ROUTES.courses, pathMatch: 'full' },
  {
    path: ROUTES.courses,
    component: CoursesComponent,
    canActivate: [AuthGuard],
  },
  { path: ROUTES.login, component: LoginComponent },
  {
    path: ROUTES.addCourse,
    component: CreateOrEditCourseComponent,
    canActivate: [AuthGuard],
  },
  {
    path: ROUTES.editCourse,
    component: CreateOrEditCourseComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
