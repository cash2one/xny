import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsInfoMembersComponent } from './apps-info-members.component';

describe('AppsInfoMembersComponent', () => {
  let component: AppsInfoMembersComponent;
  let fixture: ComponentFixture<AppsInfoMembersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppsInfoMembersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppsInfoMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
