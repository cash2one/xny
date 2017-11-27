import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitStepThreeComponent } from './submit-step-three.component';

describe('SubmitStepThreeComponent', () => {
  let component: SubmitStepThreeComponent;
  let fixture: ComponentFixture<SubmitStepThreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitStepThreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitStepThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
