import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyEditAddComponent } from './company-edit-add.component';

describe('CompanyEditAddComponent', () => {
  let component: CompanyEditAddComponent;
  let fixture: ComponentFixture<CompanyEditAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyEditAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyEditAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
