import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RuanwenAccountComponent } from './ruanwen-account.component';

describe('RuanwenAccountComponent', () => {
  let component: RuanwenAccountComponent;
  let fixture: ComponentFixture<RuanwenAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RuanwenAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RuanwenAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
