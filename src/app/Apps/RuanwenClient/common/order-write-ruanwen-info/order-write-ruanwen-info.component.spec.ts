import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderWriteRuanwenInfoComponent } from './order-write-ruanwen-info.component';

describe('OrderWriteRuanwenInfoComponent', () => {
  let component: OrderWriteRuanwenInfoComponent;
  let fixture: ComponentFixture<OrderWriteRuanwenInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderWriteRuanwenInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderWriteRuanwenInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
