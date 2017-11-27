import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RuanwenOrderInfoComponent } from './ruanwen-order-info.component';

describe('RuanwenOrderInfoComponent', () => {
  let component: RuanwenOrderInfoComponent;
  let fixture: ComponentFixture<RuanwenOrderInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RuanwenOrderInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RuanwenOrderInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
