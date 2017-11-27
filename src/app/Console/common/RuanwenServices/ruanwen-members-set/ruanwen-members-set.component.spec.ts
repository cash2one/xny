import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RuanwenMembersSetComponent } from './ruanwen-members-set.component';

describe('RuanwenMembersSetComponent', () => {
  let component: RuanwenMembersSetComponent;
  let fixture: ComponentFixture<RuanwenMembersSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RuanwenMembersSetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RuanwenMembersSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
