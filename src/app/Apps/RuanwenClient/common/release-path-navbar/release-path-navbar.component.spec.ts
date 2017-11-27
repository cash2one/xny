import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleasePathNavbarComponent } from './release-path-navbar.component';

describe('ReleasePathNavbarComponent', () => {
  let component: ReleasePathNavbarComponent;
  let fixture: ComponentFixture<ReleasePathNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReleasePathNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReleasePathNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
