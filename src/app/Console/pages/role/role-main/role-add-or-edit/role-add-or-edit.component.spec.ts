import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleAddOrEditComponent } from './role-add-or-edit.component';

describe('RoleAddOrEditComponent', () => {
  let component: RoleAddOrEditComponent;
  let fixture: ComponentFixture<RoleAddOrEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleAddOrEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleAddOrEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
