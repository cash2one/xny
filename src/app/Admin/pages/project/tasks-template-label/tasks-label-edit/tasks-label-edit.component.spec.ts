import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksLabelEditComponent } from './tasks-label-edit.component';

describe('TasksLabelEditComponent', () => {
  let component: TasksLabelEditComponent;
  let fixture: ComponentFixture<TasksLabelEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TasksLabelEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksLabelEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
