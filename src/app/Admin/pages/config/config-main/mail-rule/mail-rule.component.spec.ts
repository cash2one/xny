import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MailRuleComponent } from './mail-rule.component';

describe('MailRuleComponent', () => {
  let component: MailRuleComponent;
  let fixture: ComponentFixture<MailRuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MailRuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
