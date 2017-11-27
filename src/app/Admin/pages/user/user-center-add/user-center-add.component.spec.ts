import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCenterAddComponent } from './user-center-add.component';

describe('UserCenterAddComponent', () => {
  let component: UserCenterAddComponent;
  let fixture: ComponentFixture<UserCenterAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCenterAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCenterAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
