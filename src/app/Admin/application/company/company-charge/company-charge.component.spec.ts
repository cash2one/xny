import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyChargeComponent } from './company-charge.component';

describe('CompanyChargeComponent', () => {
  let component: CompanyChargeComponent;
  let fixture: ComponentFixture<CompanyChargeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyChargeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyChargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
