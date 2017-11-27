import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersSetRoleComponent } from './members-set-role.component';

describe('MembersSetRoleComponent', () => {
  let component: MembersSetRoleComponent;
  let fixture: ComponentFixture<MembersSetRoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembersSetRoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembersSetRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
