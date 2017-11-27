import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddoncenterMainComponent } from './addoncenter-main.component';

describe('AddoncenterMainComponent', () => {
  let component: AddoncenterMainComponent;
  let fixture: ComponentFixture<AddoncenterMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddoncenterMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddoncenterMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
