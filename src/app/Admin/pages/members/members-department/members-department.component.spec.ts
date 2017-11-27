import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersDepartmentComponent } from './members-department.component';

describe('MembersDepartmentComponent', () => {
  let component: MembersDepartmentComponent;
  let fixture: ComponentFixture<MembersDepartmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembersDepartmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembersDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
