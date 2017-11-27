import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyConfirmComponent } from './my-confirm.component';

describe('MyConfirmComponent', () => {
  let component: MyConfirmComponent;
  let fixture: ComponentFixture<MyConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
