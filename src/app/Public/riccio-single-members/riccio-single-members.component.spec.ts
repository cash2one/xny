import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiccioSingleMembersComponent } from './riccio-single-members.component';

describe('RiccioSingleMembersComponent', () => {
  let component: RiccioSingleMembersComponent;
  let fixture: ComponentFixture<RiccioSingleMembersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiccioSingleMembersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiccioSingleMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
