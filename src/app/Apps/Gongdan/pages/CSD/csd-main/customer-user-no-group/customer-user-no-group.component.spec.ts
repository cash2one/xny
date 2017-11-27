import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerUserNoGroupComponent } from './customer-user-no-group.component';

describe('CustomerUserNoGroupComponent', () => {
  let component: CustomerUserNoGroupComponent;
  let fixture: ComponentFixture<CustomerUserNoGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerUserNoGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerUserNoGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
