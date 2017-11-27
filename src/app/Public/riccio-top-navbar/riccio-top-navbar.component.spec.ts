import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiccioTopNavbarComponent } from './riccio-top-navbar.component';

describe('RiccioTopNavbarComponent', () => {
  let component: RiccioTopNavbarComponent;
  let fixture: ComponentFixture<RiccioTopNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiccioTopNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiccioTopNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
