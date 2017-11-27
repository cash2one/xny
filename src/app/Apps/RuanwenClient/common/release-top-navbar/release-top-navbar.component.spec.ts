import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleaseTopNavbarComponent } from './release-top-navbar.component';

describe('ReleaseTopNavbarComponent', () => {
  let component: ReleaseTopNavbarComponent;
  let fixture: ComponentFixture<ReleaseTopNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReleaseTopNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReleaseTopNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
