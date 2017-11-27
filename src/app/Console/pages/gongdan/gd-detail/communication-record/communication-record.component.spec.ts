import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunicationRecordComponent } from './communication-record.component';

describe('CommunicationRecordComponent', () => {
  let component: CommunicationRecordComponent;
  let fixture: ComponentFixture<CommunicationRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunicationRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunicationRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
