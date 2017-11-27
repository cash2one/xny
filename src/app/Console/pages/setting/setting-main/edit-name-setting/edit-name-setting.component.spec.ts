import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNameSettingComponent } from './edit-name-setting.component';

describe('EditNameSettingComponent', () => {
  let component: EditNameSettingComponent;
  let fixture: ComponentFixture<EditNameSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditNameSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditNameSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
