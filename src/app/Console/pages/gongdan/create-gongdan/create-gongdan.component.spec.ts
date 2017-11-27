import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitStepFourComponent } from './submit-step-four.component';

describe('SubmitStepFourComponent', () => {
  let component: SubmitStepFourComponent;
  let fixture: ComponentFixture<SubmitStepFourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitStepFourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitStepFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
