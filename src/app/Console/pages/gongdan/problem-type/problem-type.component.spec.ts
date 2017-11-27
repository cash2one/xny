import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitStepTwoComponent } from './submit-step-two.component';

describe('SubmitStepTwoComponent', () => {
  let component: SubmitStepTwoComponent;
  let fixture: ComponentFixture<SubmitStepTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitStepTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitStepTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
