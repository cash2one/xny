import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderWriteInfoComponent } from './order-write-info.component';

describe('OrderWriteInfoComponent', () => {
  let component: OrderWriteInfoComponent;
  let fixture: ComponentFixture<OrderWriteInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderWriteInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderWriteInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
