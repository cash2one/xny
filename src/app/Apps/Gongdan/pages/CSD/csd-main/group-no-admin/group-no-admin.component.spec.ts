import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupNoAdminComponent } from './group-no-admin.component';

describe('GroupNoAdminComponent', () => {
  let component: GroupNoAdminComponent;
  let fixture: ComponentFixture<GroupNoAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupNoAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupNoAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
