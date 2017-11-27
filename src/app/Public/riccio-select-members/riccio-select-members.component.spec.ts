import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiccioSelectMembersComponent } from './riccio-select-members.component';

describe('RiccioSelectMembersComponent', () => {
  let component: RiccioSelectMembersComponent;
  let fixture: ComponentFixture<RiccioSelectMembersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiccioSelectMembersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiccioSelectMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
