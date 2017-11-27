import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigDriveComponent } from './config-drive.component';

describe('ConfigDriveComponent', () => {
  let component: ConfigDriveComponent;
  let fixture: ComponentFixture<ConfigDriveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigDriveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigDriveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
