import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToMembersComponent } from './add-to-members.component';

describe('AddToMembersComponent', () => {
  let component: AddToMembersComponent;
  let fixture: ComponentFixture<AddToMembersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddToMembersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddToMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
