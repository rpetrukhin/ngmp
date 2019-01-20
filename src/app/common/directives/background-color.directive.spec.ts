import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import * as moment from 'moment';

import { BackgroundColorDirective } from './background-color.directive';

@Component({
  template: `
    <h1 [appBackgroundColor]="tenDaysAgo">Background red</h1>
    <h2 [appBackgroundColor]="tenDaysInFuture">Background blue</h2>
    <h3 [appBackgroundColor]="yearAgo">No Background</h3>
  `,
})
class TestComponent {
  tenDaysAgo = moment().subtract(10, 'days');
  tenDaysInFuture = moment().add(10, 'days');
  yearAgo = moment().subtract(1, 'year');
}

describe('BackgroundColorDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, BackgroundColorDirective],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should set h1 background color to red', () => {
    const h1 = fixture.debugElement.query(By.css('h1'));
    expect(h1.nativeElement.style.backgroundColor).toBe(
      'rgba(231, 120, 131, 0.1)'
    );
  });

  it('should set h2 background color to blue', () => {
    const h2 = fixture.debugElement.query(By.css('h2'));
    expect(h2.nativeElement.style.backgroundColor).toBe(
      'rgba(52, 183, 222, 0.1)'
    );
  });

  it('should not set h3 background color', () => {
    const h3 = fixture.debugElement.query(By.css('h3'));
    expect(h3.nativeElement.style.backgroundColor).toBe('');
  });
});
