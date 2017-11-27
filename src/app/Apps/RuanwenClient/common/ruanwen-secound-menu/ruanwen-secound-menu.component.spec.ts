import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RuanwenSecoundMenuComponent } from './ruanwen-secound-menu.component';

describe('RuanwenSecoundMenuComponent', () => {
  let component: RuanwenSecoundMenuComponent;
  let fixture: ComponentFixture<RuanwenSecoundMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RuanwenSecoundMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RuanwenSecoundMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
