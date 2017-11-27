import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyAuditComponent } from './company-audit.component';

describe('CompanyAuditComponent', () => {
  let component: CompanyAuditComponent;
  let fixture: ComponentFixture<CompanyAuditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyAuditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyAuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
