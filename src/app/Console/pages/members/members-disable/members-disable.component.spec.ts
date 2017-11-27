import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersDisableComponent } from './members-disable.component';

describe('MembersDisableComponent', () => {
  let component: MembersDisableComponent;
  let fixture: ComponentFixture<MembersDisableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembersDisableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembersDisableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
