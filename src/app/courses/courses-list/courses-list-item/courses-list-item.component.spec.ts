import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

import { CoursesListItemComponent } from './courses-list-item.component';
import { CoursesListItem } from 'src/app-entities/classes/courses-list-item.model';

@Component({
  template: `
    <app-courses-list-item
      [course]="course"
      (deleted)="deleteCourse($event)"
    ></app-courses-list-item>
  `,
})
class TestHostComponent {
  public course: CoursesListItem = {
    id: 1,
    title: 'Video Course 1',
    creationDate: new Date(2018, 2, 12),
    duration: 88,
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
      quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat`,
  };
  public id: number;
  public deleteCourse(id: number) {
    this.id = id;
  }
}

describe('CoursesListItemComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FontAwesomeModule],
      declarations: [CoursesListItemComponent, TestHostComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should raise id of deleted course', () => {
    const expectedId = 1;

    const button = fixture.debugElement.query(By.css('.delete'));
    button.triggerEventHandler('click', null);

    expect(component.id).toEqual(expectedId);
  });
});
