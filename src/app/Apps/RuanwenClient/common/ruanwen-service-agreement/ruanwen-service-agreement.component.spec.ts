import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RuanwenServiceAgreementComponent } from './ruanwen-service-agreement.component';

describe('RuanwenServiceAgreementComponent', () => {
  let component: RuanwenServiceAgreementComponent;
  let fixture: ComponentFixture<RuanwenServiceAgreementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RuanwenServiceAgreementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RuanwenServiceAgreementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
