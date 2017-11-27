import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RuanwenComponent } from './ruanwen.component';

describe('RuanwenComponent', () => {
  let component: RuanwenComponent;
  let fixture: ComponentFixture<RuanwenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RuanwenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RuanwenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
