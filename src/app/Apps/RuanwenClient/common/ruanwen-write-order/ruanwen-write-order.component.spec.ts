import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RuanwenWriteOrderComponent } from './ruanwen-write-order.component';

describe('RuanwenWriteOrderComponent', () => {
  let component: RuanwenWriteOrderComponent;
  let fixture: ComponentFixture<RuanwenWriteOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RuanwenWriteOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RuanwenWriteOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
