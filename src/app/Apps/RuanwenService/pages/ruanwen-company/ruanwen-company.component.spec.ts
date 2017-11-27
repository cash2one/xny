import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RuanwenCompanyComponent } from './ruanwen-company.component';

describe('RuanwenCompanyComponent', () => {
  let component: RuanwenCompanyComponent;
  let fixture: ComponentFixture<RuanwenCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RuanwenCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RuanwenCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
