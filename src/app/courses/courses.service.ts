import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CoursesListItem } from 'src/app-entities/classes/courses-list-item.model';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  constructor(private http: HttpClient) {}

  getCourses(
    offset: number,
    count: number,
    searchCriteria: string
  ): Observable<Object> {
    return this.http.get(
      `http://localhost:3004/courses?start=${offset}&count=${count}&textFragment=${searchCriteria ||
        ''}`
    );
  }

  getCourse(id: number): Observable<Object> {
    return this.http.get(`http://localhost:3004/courses/${id}`);
  }

  createCourse(course: CoursesListItem): Observable<Object> {
    return this.http.post(`http://localhost:3004/courses`, course);
  }

  updateCourse(updatedCourse: CoursesListItem): Observable<Object> {
    return this.http.put(
      `http://localhost:3004/courses/${updatedCourse.id}`,
      updatedCourse
    );
  }

  deleteCourse(id: number): Observable<Object> {
    return this.http.delete(`http://localhost:3004/courses/${id}`);
  }

  getAuthors(): Observable<Object> {
    return this.http.get(`http://localhost:3004/authors`);
  }
}
