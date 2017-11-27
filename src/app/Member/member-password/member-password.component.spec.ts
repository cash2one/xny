import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberPasswordComponent } from './member-password.component';

describe('MemberPasswordComponent', () => {
  let component: MemberPasswordComponent;
  let fixture: ComponentFixture<MemberPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
