import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GdDetailStepBarComponent } from './gd-detail-step-bar.component';

describe('GdDetailStepBarComponent', () => {
  let component: GdDetailStepBarComponent;
  let fixture: ComponentFixture<GdDetailStepBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GdDetailStepBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GdDetailStepBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
