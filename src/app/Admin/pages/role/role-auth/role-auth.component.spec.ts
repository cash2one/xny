import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleAuthComponent } from './role-auth.component';

describe('RoleAuthComponent', () => {
  let component: RoleAuthComponent;
  let fixture: ComponentFixture<RoleAuthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleAuthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
