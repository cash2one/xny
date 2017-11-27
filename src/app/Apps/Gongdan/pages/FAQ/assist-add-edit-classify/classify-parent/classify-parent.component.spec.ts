import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassifyParentComponent } from './classify-parent.component';

describe('ClassifyParentComponent', () => {
  let component: ClassifyParentComponent;
  let fixture: ComponentFixture<ClassifyParentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassifyParentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassifyParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
