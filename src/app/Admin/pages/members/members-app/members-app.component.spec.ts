import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersAppComponent } from './members-app.component';

describe('MembersAppComponent', () => {
  let component: MembersAppComponent;
  let fixture: ComponentFixture<MembersAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembersAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembersAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
