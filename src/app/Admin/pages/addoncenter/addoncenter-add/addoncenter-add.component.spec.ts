import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddoncenterAddComponent } from './addoncenter-add.component';

describe('AddoncenterAddComponent', () => {
  let component: AddoncenterAddComponent;
  let fixture: ComponentFixture<AddoncenterAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddoncenterAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddoncenterAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
