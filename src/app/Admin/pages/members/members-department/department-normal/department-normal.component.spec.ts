import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentNormalComponent } from './department-normal.component';

describe('DepartmentNormalComponent', () => {
  let component: DepartmentNormalComponent;
  let fixture: ComponentFixture<DepartmentNormalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartmentNormalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentNormalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
