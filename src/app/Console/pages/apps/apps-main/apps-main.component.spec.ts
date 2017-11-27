import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsMainComponent } from './apps-main.component';

describe('AppsMainComponent', () => {
  let component: AppsMainComponent;
  let fixture: ComponentFixture<AppsMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppsMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
