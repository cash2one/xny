import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiccioTreeDepartmentComponent } from './riccio-tree-department.component';

describe('RiccioTreeDepartmentComponent', () => {
  let component: RiccioTreeDepartmentComponent;
  let fixture: ComponentFixture<RiccioTreeDepartmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiccioTreeDepartmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiccioTreeDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
