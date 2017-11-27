import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksLabelAddComponent } from './tasks-label-add.component';

describe('TasksLabelAddComponent', () => {
  let component: TasksLabelAddComponent;
  let fixture: ComponentFixture<TasksLabelAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TasksLabelAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksLabelAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
