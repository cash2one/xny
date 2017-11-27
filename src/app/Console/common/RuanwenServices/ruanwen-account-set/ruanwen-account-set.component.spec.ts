import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RuanwenAccountSetComponent } from './ruanwen-account-set.component';

describe('RuanwenAccountSetComponent', () => {
  let component: RuanwenAccountSetComponent;
  let fixture: ComponentFixture<RuanwenAccountSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RuanwenAccountSetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RuanwenAccountSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
