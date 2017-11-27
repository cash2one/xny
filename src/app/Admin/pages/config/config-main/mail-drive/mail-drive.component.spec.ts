import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MailDriveComponent } from './mail-drive.component';

describe('MailDriveComponent', () => {
  let component: MailDriveComponent;
  let fixture: ComponentFixture<MailDriveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MailDriveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailDriveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
