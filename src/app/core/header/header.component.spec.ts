import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { HeaderComponent } from './header.component';
import { UserService } from 'src/app/user/user.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let mockUserService: Partial<UserService>;

  beforeEach(async(() => {
    mockUserService = {
      getUser() {
        return {
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
        };
      },
    };

    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [{ provide: UserService, useValue: mockUserService }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should set correct content getting from user service in a span tag', () => {
    const expectedValue = `${mockUserService.getUser().firstName} ${
      mockUserService.getUser().lastName
    }`;
    const span = fixture.nativeElement.querySelector('.userInfo');

    expect(span.textContent).toBe(expectedValue);
  });
});
