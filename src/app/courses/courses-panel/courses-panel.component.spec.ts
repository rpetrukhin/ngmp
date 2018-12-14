import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CoursesPanelComponent } from './courses-panel.component';

describe('CoursesPanelComponent', () => {
  let component: CoursesPanelComponent;
  let fixture: ComponentFixture<CoursesPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [CoursesPanelComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  // Question here
  describe('on input', () => {
    it('should change input value', () => {
      const input = fixture.debugElement.query(By.css('input'));

      // 1 case
      input.triggerEventHandler('input', {
        target: { value: 'Quick Brown Fox' },
      });

      // 2 case
      input.nativeElement.value = 'Quick Brown Fox';
      input.nativeElement.dispatchEvent(new Event('input'));

      // This test passed only with 2 case
      expect(input.nativeElement.value).toBe('Quick Brown Fox');

      // This test passed with both cases
      expect(component.searchText).toBe('Quick Brown Fox');
    });
  });

  describe('on click search button', () => {
    let button: DebugElement;
    let searchSpy: jasmine.Spy;

    it('should call search method', () => {
      searchSpy = spyOn(component, 'search');

      button = fixture.debugElement.query(By.css('.search'));
      button.triggerEventHandler('click', null);

      expect(searchSpy).toHaveBeenCalled();
    });
  });
});
