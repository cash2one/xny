import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCodeSmsComponent } from './add-code-sms.component';

describe('AddCodeSmsComponent', () => {
  let component: AddCodeSmsComponent;
  let fixture: ComponentFixture<AddCodeSmsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCodeSmsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCodeSmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
