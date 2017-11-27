import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppcenterMainComponent } from './appcenter-main.component';

describe('AppcenterMainComponent', () => {
  let component: AppcenterMainComponent;
  let fixture: ComponentFixture<AppcenterMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppcenterMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppcenterMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
