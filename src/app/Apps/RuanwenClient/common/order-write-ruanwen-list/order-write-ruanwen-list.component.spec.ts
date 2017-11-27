import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderWriteRuanwenListComponent } from './order-write-ruanwen-list.component';

describe('OrderWriteRuanwenListComponent', () => {
  let component: OrderWriteRuanwenListComponent;
  let fixture: ComponentFixture<OrderWriteRuanwenListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderWriteRuanwenListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderWriteRuanwenListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
