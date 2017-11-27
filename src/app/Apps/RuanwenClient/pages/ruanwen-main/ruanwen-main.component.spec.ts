import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RuanwenMainComponent } from './ruanwen-main.component';

describe('RuanwenMainComponent', () => {
  let component: RuanwenMainComponent;
  let fixture: ComponentFixture<RuanwenMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RuanwenMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RuanwenMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
