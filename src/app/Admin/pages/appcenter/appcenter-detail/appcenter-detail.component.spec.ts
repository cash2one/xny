import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppcenterDetailComponent } from './appcenter-detail.component';

describe('AppcenterDetailComponent', () => {
  let component: AppcenterDetailComponent;
  let fixture: ComponentFixture<AppcenterDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppcenterDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppcenterDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
