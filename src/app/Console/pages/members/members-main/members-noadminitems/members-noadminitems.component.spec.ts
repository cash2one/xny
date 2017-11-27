import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersNoadminitemsComponent } from './members-noadminitems.component';

describe('MembersNoadminitemsComponent', () => {
  let component: MembersNoadminitemsComponent;
  let fixture: ComponentFixture<MembersNoadminitemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembersNoadminitemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembersNoadminitemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
