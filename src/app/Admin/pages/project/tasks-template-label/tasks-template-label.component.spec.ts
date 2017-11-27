import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksTemplateLabelComponent } from './tasks-template-label.component';

describe('TasksTemplateLabelComponent', () => {
  let component: TasksTemplateLabelComponent;
  let fixture: ComponentFixture<TasksTemplateLabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TasksTemplateLabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksTemplateLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
