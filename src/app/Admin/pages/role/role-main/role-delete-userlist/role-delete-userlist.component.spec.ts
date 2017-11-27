import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleDeleteUserlistComponent } from './role-delete-userlist.component';

describe('RoleDeleteUserlistComponent', () => {
  let component: RoleDeleteUserlistComponent;
  let fixture: ComponentFixture<RoleDeleteUserlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleDeleteUserlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleDeleteUserlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
