import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersSetAdminComponent } from './members-set-admin.component';

describe('MembersSetAdminComponent', () => {
  let component: MembersSetAdminComponent;
  let fixture: ComponentFixture<MembersSetAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembersSetAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembersSetAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
