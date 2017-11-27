import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToComponent } from './add-to.component';

describe('AddToComponent', () => {
  let component: AddToComponent;
  let fixture: ComponentFixture<AddToComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddToComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddToComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
