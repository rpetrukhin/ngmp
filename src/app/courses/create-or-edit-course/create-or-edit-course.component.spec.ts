import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrEditCourseComponent } from './create-or-edit-course.component';

describe('CreateOrEditCourseComponent', () => {
  let component: CreateOrEditCourseComponent;
  let fixture: ComponentFixture<CreateOrEditCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateOrEditCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrEditCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
