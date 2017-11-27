import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsMyComponent } from './apps-my.component';

describe('AppsMyComponent', () => {
  let component: AppsMyComponent;
  let fixture: ComponentFixture<AppsMyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppsMyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppsMyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
