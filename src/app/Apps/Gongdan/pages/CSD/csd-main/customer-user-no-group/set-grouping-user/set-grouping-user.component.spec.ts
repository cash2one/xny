import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetGroupingUserComponent } from './set-grouping-user.component';

describe('SetGroupingUserComponent', () => {
  let component: SetGroupingUserComponent;
  let fixture: ComponentFixture<SetGroupingUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetGroupingUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetGroupingUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
