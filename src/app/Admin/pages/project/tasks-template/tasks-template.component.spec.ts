import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksTemplateComponent } from './tasks-template.component';

describe('TasksTemplateComponent', () => {
  let component: TasksTemplateComponent;
  let fixture: ComponentFixture<TasksTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TasksTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
