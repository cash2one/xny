import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitStepOneComponent } from './problem-product.component';

describe('SubmitStepOneComponent', () => {
  let component: SubmitStepOneComponent;
  let fixture: ComponentFixture<SubmitStepOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitStepOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitStepOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
