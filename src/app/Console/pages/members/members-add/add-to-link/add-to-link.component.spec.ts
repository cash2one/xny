import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToLinkComponent } from './add-to-link.component';

describe('AddToLinkComponent', () => {
  let component: AddToLinkComponent;
  let fixture: ComponentFixture<AddToLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddToLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddToLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
