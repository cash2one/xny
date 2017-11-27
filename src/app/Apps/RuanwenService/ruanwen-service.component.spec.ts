import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RuanwenServiceComponent } from './ruanwen-service.component';

describe('RuanwenServiceComponent', () => {
  let component: RuanwenServiceComponent;
  let fixture: ComponentFixture<RuanwenServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RuanwenServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RuanwenServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
