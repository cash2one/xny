import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAreaSettingComponent } from './edit-area-setting.component';

describe('EditAreaSettingComponent', () => {
  let component: EditAreaSettingComponent;
  let fixture: ComponentFixture<EditAreaSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAreaSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAreaSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
