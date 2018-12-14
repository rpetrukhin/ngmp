import { TestBed } from '@angular/core/testing';

import { CoursesService } from './courses.service';

describe('CoursesService', () => {
  let service: CoursesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(CoursesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getCourses should return correct data', () => {
    expect(service.getCourses()).toBe(service.courses);
  });

  it('deleteCourse should delete correct course', () => {
    const courses = service.courses;
    service.deleteCourse(courses[0].id);

    expect(service.getCourses()).toEqual([courses[1]]);
  });
});
