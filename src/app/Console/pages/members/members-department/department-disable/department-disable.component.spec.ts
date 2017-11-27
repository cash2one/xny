import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentDisableComponent } from './department-disable.component';

describe('DepartmentDisableComponent', () => {
  let component: DepartmentDisableComponent;
  let fixture: ComponentFixture<DepartmentDisableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartmentDisableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentDisableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
