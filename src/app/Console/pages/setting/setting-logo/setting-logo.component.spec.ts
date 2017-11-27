import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingLogoComponent } from './setting-logo.component';

describe('SettingLogoComponent', () => {
  let component: SettingLogoComponent;
  let fixture: ComponentFixture<SettingLogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingLogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
