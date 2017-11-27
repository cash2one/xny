import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleSelectRoleComponent } from './role-select-role.component';

describe('RoleSelectRoleComponent', () => {
  let component: RoleSelectRoleComponent;
  let fixture: ComponentFixture<RoleSelectRoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleSelectRoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleSelectRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
