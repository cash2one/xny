import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigRuleComponent } from './config-rule.component';

describe('ConfigRuleComponent', () => {
  let component: ConfigRuleComponent;
  let fixture: ComponentFixture<ConfigRuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigRuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
