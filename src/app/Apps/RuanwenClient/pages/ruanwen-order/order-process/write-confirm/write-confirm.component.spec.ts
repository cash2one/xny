import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WriteConfirmComponent } from './write-confirm.component';

describe('WriteConfirmComponent', () => {
  let component: WriteConfirmComponent;
  let fixture: ComponentFixture<WriteConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WriteConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WriteConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
