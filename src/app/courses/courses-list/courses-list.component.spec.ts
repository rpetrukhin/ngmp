import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { CoursesListComponent } from './courses-list.component';
import { CoursesService } from '../courses.service';

describe('CoursesListComponent', () => {
  let component: CoursesListComponent;
  let fixture: ComponentFixture<CoursesListComponent>;
  let mockCoursesService: Partial<CoursesService>;

  beforeEach(async(() => {
    mockCoursesService = {
      getCourses() {
        return [
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
    expect(component.courses).toEqual(mockCoursesService.getCourses());
  });

  it('should have correct number of li elements', () => {
    const li = fixture.nativeElement.querySelectorAll('li');

    expect(li.length).toBe(mockCoursesService.getCourses().length);
  });

  // This describe doesn't work
  describe('on click delete', () => {
    let button: DebugElement;

    beforeEach(() => {
      button = fixture.debugElement.query(By.css('app-courses-list-item'));
      button.triggerEventHandler('deleted', 1);
    });

    it('should update courses variable', () => {
      expect(component.courses).toEqual([mockCoursesService.getCourses()[1]]);
    });

    it('should update number of li elements', () => {
      const li = fixture.nativeElement.querySelectorAll('li');

      expect(li.length).toBe(mockCoursesService.getCourses().length - 1);
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
