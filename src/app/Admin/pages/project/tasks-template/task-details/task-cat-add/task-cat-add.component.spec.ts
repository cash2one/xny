import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskCatAddComponent } from './task-cat-add.component';

describe('TaskCatAddComponent', () => {
  let component: TaskCatAddComponent;
  let fixture: ComponentFixture<TaskCatAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskCatAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskCatAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
