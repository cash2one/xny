import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersNodepartmentitemsComponent } from './members-nodepartmentitems.component';

describe('MembersNodepartmentitemsComponent', () => {
  let component: MembersNodepartmentitemsComponent;
  let fixture: ComponentFixture<MembersNodepartmentitemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembersNodepartmentitemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembersNodepartmentitemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
