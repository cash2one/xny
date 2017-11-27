import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToPhoneComponent } from './add-to-phone.component';

describe('AddToPhoneComponent', () => {
  let component: AddToPhoneComponent;
  let fixture: ComponentFixture<AddToPhoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddToPhoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddToPhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
