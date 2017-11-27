import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleAuthorityViewComponent } from './role-authority-view.component';

describe('RoleAuthorityViewComponent', () => {
  let component: RoleAuthorityViewComponent;
  let fixture: ComponentFixture<RoleAuthorityViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleAuthorityViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleAuthorityViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
