import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiccioNotificationsComponent } from './riccio-notifications.component';

describe('RiccioNotificationsComponent', () => {
  let component: RiccioNotificationsComponent;
  let fixture: ComponentFixture<RiccioNotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiccioNotificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiccioNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
