import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeDepartmentViewComponent } from './tree-department-view.component';

describe('TreeDepartmentViewComponent', () => {
  let component: TreeDepartmentViewComponent;
  let fixture: ComponentFixture<TreeDepartmentViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreeDepartmentViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeDepartmentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
