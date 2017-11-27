import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberComsComponent } from './member-companies.component';

describe('MemberComsComponent', () => {
  let component: MemberComsComponent;
  let fixture: ComponentFixture<MemberComsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberComsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberComsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
