import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RuanwenAdvertisingLawComponent } from './ruanwen-advertising-law.component';

describe('RuanwenAdvertisingLawComponent', () => {
  let component: RuanwenAdvertisingLawComponent;
  let fixture: ComponentFixture<RuanwenAdvertisingLawComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RuanwenAdvertisingLawComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RuanwenAdvertisingLawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
