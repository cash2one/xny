import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiccioAppLeftMenuComponent } from './riccio-app-left-menu.component';

describe('RiccioAppLeftMenuComponent', () => {
  let component: RiccioAppLeftMenuComponent;
  let fixture: ComponentFixture<RiccioAppLeftMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiccioAppLeftMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiccioAppLeftMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
