import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddoncenterDetialComponent } from './addoncenter-detial.component';

describe('AddoncenterDetialComponent', () => {
  let component: AddoncenterDetialComponent;
  let fixture: ComponentFixture<AddoncenterDetialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddoncenterDetialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddoncenterDetialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
