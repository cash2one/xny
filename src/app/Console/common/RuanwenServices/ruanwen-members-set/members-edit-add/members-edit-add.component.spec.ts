import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersEditAddComponent } from './members-edit-add.component';

describe('MembersEditAddComponent', () => {
  let component: MembersEditAddComponent;
  let fixture: ComponentFixture<MembersEditAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembersEditAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembersEditAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
