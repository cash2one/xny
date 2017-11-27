import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddoncenterComponent } from './addoncenter.component';

describe('AddoncenterComponent', () => {
  let component: AddoncenterComponent;
  let fixture: ComponentFixture<AddoncenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddoncenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddoncenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
