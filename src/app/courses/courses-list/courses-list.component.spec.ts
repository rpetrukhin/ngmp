import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { CoursesListComponent } from './courses-list.component';
import { CoursesService } from '../courses.service';
import { CoursesListItem } from 'src/app-entities/classes/courses-list-item.model';

describe('CoursesListComponent', () => {
  let component: CoursesListComponent;
  let fixture: ComponentFixture<CoursesListComponent>;
  let mockCoursesService: Partial<CoursesService>;
  let mockCourses: Array<CoursesListItem>;

  beforeEach(async(() => {
    mockCourses = [
      {
        id: 1,
        title: 'Video Course 1',
        creationDate: new Date(2018, 6, 2),
        duration: 88,
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat`,
      },
      {
        id: 2,
        title: 'Video Course 2',
        creationDate: new Date(2018, 11, 28),
        duration: 27,
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat`,
      },
    ];

    mockCoursesService = {
      getCourses() {
        return mockCourses;
      },
      deleteCourse(id: number) {
        return;
      },
    };

    TestBed.configureTestingModule({
      declarations: [CoursesListComponent],
      providers: [{ provide: CoursesService, useValue: mockCoursesService }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should get courses on init', () => {
    expect(component.courses).toEqual(mockCourses);
  });

  it('should have correct number of li elements', () => {
    const li = fixture.nativeElement.querySelectorAll('li');

    expect(li.length).toBe(mockCourses.length);
  });

  describe('on click delete', () => {
    let spyGetCourses: jasmine.Spy;
    let spyDeleteCourse: jasmine.Spy;
    let dbg: DebugElement;

    beforeEach(() => {
      const courseService = TestBed.get(CoursesService);

      spyGetCourses = spyOn(courseService, 'getCourses').and.returnValue([
        {
          id: 2,
          title: 'Video Course 2',
          creationDate: new Date(2018, 11, 28),
          duration: 27,
          description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat`,
        },
      ]);
      spyDeleteCourse = spyOn(courseService, 'deleteCourse');

      dbg = fixture.debugElement.query(By.css('app-courses-list-item'));
      dbg.triggerEventHandler('deleted', 1);

      fixture.detectChanges();
    });

    it('should call delete and get methods of coursesService', () => {
      expect(spyDeleteCourse).toHaveBeenCalledWith(1);
      expect(spyGetCourses).toHaveBeenCalled();
    });

    it('should update courses variable', () => {
      expect(component.courses).toEqual([mockCourses[1]]);
    });

    it('should update number of li elements', () => {
      const li = fixture.nativeElement.querySelectorAll('li');

      expect(li.length).toBe(mockCourses.length - 1);
    });
  });

  describe('on click load more', () => {
    it('should call console.log with correct params', () => {
      const consoleLogSpy = spyOn(console, 'log');

      const button = fixture.debugElement.query(By.css('.load'));
      button.triggerEventHandler('click', null);

      expect(consoleLogSpy).toHaveBeenCalledWith('Load more');
    });
  });
});
