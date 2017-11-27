import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingCertificationComponent } from './setting-certification.component';

describe('SettingCertificationComponent', () => {
  let component: SettingCertificationComponent;
  let fixture: ComponentFixture<SettingCertificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingCertificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingCertificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
