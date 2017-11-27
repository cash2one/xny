import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTransferSettingComponent } from './edit-transfer-setting.component';

describe('EditTransferSettingComponent', () => {
  let component: EditTransferSettingComponent;
  let fixture: ComponentFixture<EditTransferSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTransferSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTransferSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
