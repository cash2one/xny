import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersSetDepartmentMainComponent } from './members-set-department-main.component';

describe('MembersSetDepartmentMainComponent', () => {
  let component: MembersSetDepartmentMainComponent;
  let fixture: ComponentFixture<MembersSetDepartmentMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembersSetDepartmentMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembersSetDepartmentMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
