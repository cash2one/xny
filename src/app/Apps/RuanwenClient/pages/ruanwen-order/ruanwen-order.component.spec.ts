import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RuanwenOrderComponent } from './ruanwen-order.component';

describe('RuanwenOrderComponent', () => {
  let component: RuanwenOrderComponent;
  let fixture: ComponentFixture<RuanwenOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RuanwenOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RuanwenOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
