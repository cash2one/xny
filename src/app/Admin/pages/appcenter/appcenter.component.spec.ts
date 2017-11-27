import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppcenterComponent } from './appcenter.component';

describe('AppcenterComponent', () => {
  let component: AppcenterComponent;
  let fixture: ComponentFixture<AppcenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppcenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppcenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
