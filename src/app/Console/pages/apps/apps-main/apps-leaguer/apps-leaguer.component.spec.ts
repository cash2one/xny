import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsLeaguerComponent } from './apps-leaguer.component';

describe('AppsLeaguerComponent', () => {
  let component: AppsLeaguerComponent;
  let fixture: ComponentFixture<AppsLeaguerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppsLeaguerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppsLeaguerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
