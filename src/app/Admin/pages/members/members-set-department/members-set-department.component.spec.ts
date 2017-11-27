import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersSetDepartmentComponent } from './members-set-department.component';

describe('MembersSetDepartmentComponent', () => {
  let component: MembersSetDepartmentComponent;
  let fixture: ComponentFixture<MembersSetDepartmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembersSetDepartmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembersSetDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
